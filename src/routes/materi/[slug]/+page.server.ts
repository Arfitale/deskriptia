import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { materials } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const rows = await db.select().from(materials).where(eq(materials.slug, params.slug)).limit(1);
	const material = rows[0];
	if (!material) {
		throw error(404, 'Material not found');
	}

	return { material };
};
