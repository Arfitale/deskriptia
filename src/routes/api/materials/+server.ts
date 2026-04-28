import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { materials } from '$lib/server/db/schema';

export async function GET() {
	const rows = await db.select().from(materials);
	return json(rows);
}
