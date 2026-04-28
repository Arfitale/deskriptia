import { json } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { drafts } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.user) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	const draftId = Number(params.id);
	if (!draftId) {
		return json({ message: 'Invalid draft id' }, { status: 400 });
	}

	const body = (await request.json()) as {
		judul?: string;
		deskripsiObjek?: string;
		simpulan?: string;
	};

	const updated = await db
		.update(drafts)
		.set({
			data: {
				judul: body.judul ?? '',
				deskripsiObjek: body.deskripsiObjek ?? '',
				simpulan: body.simpulan ?? ''
			},
			updatedAt: new Date()
		})
		.where(and(eq(drafts.id, draftId), eq(drafts.userId, locals.user.id)))
		.returning({ id: drafts.id });

	if (!updated[0]) {
		return json({ message: 'Draft not found' }, { status: 404 });
	}

	return json({ id: updated[0].id, message: 'Draft saved' });
};
