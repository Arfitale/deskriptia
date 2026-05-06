import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { drafts, materials } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	const draftId = Number(params.draftId);
	if (!draftId) {
		throw error(400, 'Invalid draft id');
	}

	const rows = await db
		.select({
			id: drafts.id,
			data: drafts.data,
			materialTitle: materials.title
		})
		.from(drafts)
		.innerJoin(materials, eq(materials.id, drafts.materialId))
		.where(and(eq(drafts.id, draftId), eq(drafts.userId, locals.user.id)))
		.limit(1);
	const draft = rows[0];

	if (!draft) {
		throw error(404, 'Draft not found');
	}

	return { draft };
};
