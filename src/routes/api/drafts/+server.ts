import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { drafts } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	const body = (await request.json()) as { materialId?: number };
	const materialId = Number(body.materialId);
	if (!materialId) {
		return json({ message: 'Invalid material id' }, { status: 400 });
	}

	const [created] = await db
		.insert(drafts)
		.values({
			userId: locals.user.id,
			materialId,
			data: { judul: '', deskripsiObjek: '', simpulan: '' }
		})
		.returning({ id: drafts.id });

	return json({ id: created.id }, { status: 201 });
};
