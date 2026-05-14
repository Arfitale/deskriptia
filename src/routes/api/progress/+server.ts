import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserProgression } from '$lib/server/progression';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const progression = await getUserProgression(locals.user.id);

	return json({
		totalXP: progression.totalXP,
		level: progression.level,
		currentNodeId: progression.currentNodeId,
		currentTrackId: progression.currentTrackId,
		completedNodeIds: progression.completedNodeIds,
		lastActivityAt: progression.lastActivityAt
	});
};
