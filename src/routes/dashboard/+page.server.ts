import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { drafts, materials, userProgress } from '$lib/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import { enforceOnboardingGuard } from '$lib/server/guards/onboarding';

export const load: PageServerLoad = async (event) => {
	const { locals } = event;
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	// Enforce onboarding/pretest completion before dashboard access
	await enforceOnboardingGuard(event);

	const allMaterials = await db.select().from(materials);
	const progress = await db
		.select()
		.from(userProgress)
		.where(eq(userProgress.userId, locals.user.id));
	const userDrafts = await db
		.select({
			id: drafts.id,
			materialId: drafts.materialId,
			updatedAt: drafts.updatedAt,
			title: materials.title
		})
		.from(drafts)
		.innerJoin(materials, eq(materials.id, drafts.materialId))
		.where(eq(drafts.userId, locals.user.id))
		.orderBy(desc(drafts.updatedAt));

	return {
		userName: locals.user.name,
		materials: allMaterials.map((material, index) => {
			const itemProgress = progress.find((item) => item.materialId === material.id);
			const previousMaterial = allMaterials[index - 1];
			const previousProgress = previousMaterial
				? progress.find((item) => item.materialId === previousMaterial.id)
				: undefined;
			const isLocked = index > 0 && !previousProgress?.isQuizPassed;

			return {
				...material,
				score: itemProgress?.quizScore ?? 0,
				isQuizPassed: itemProgress?.isQuizPassed ?? false,
				isLocked
			};
		}),
		drafts: userDrafts
	};
};

export const actions: Actions = {
	createDraft: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth');
		}

		const formData = await request.formData();
		const materialId = Number(formData.get('materialId'));
		if (!materialId) return { error: 'Material is required' };

		const existingDraft = await db
			.select({ id: drafts.id })
			.from(drafts)
			.where(and(eq(drafts.userId, locals.user.id), eq(drafts.materialId, materialId)))
			.limit(1);

		const draftId =
			existingDraft[0]?.id ??
			(
				await db
					.insert(drafts)
					.values({
						userId: locals.user.id,
						materialId,
						data: { judul: '', deskripsiObjek: '', simpulan: '' }
					})
					.returning({ id: drafts.id })
			)[0].id;

		throw redirect(302, `/latihan-baca/${draftId}`);
	}
};
