import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { drafts, materials, userProgress } from '$lib/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import { enforceOnboardingGuard } from '$lib/server/guards/onboarding';
import { getUserProgression, buildDynamicTrack } from '$lib/server/progression';
import { getXPForNextLevel, getLevelTitle } from '$lib/utils/xp';
import { learnTrack } from '$lib/data/learnTrack';

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

	// Get user progression data
	const progression = await getUserProgression(locals.user.id);
	const xpProgress = getXPForNextLevel(progression.totalXP);
	const levelTitle = getLevelTitle(progression.level);

	// Find current lesson info for "Continue Learning"
	const currentNode = findNodeById(progression.currentNodeId);
	const currentChapter = findChapterForNode(progression.currentNodeId);

	// Calculate track progress percentage
	const allNodes = learnTrack.chapters.flatMap((ch) => ch.nodes);
	const trackProgress = allNodes.length > 0
		? Math.round((progression.completedNodeIds.length / allNodes.length) * 100)
		: 0;

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
		drafts: userDrafts,
		progression: {
			totalXP: progression.totalXP,
			level: progression.level,
			levelTitle,
			xpProgress,
			completedCount: progression.completedNodeIds.length,
			totalNodes: allNodes.length,
			trackProgress,
			continueLearning: currentNode
				? {
						nodeId: currentNode.id,
						title: currentNode.title,
						chapterTitle: currentChapter?.subtitle ?? '',
						type: currentNode.type,
						duration: currentNode.duration,
						xp: currentNode.xp
					}
				: null
		}
	};
};

function findNodeById(nodeId: string) {
	for (const chapter of learnTrack.chapters) {
		for (const node of chapter.nodes) {
			if (node.id === nodeId) return node;
		}
	}
	return null;
}

function findChapterForNode(nodeId: string) {
	for (const chapter of learnTrack.chapters) {
		if (chapter.nodes.some((n) => n.id === nodeId)) return chapter;
	}
	return null;
}

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
