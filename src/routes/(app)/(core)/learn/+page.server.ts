import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getUserProgression, buildDynamicTrack } from '$lib/server/progression';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	const progression = await getUserProgression(locals.user.id);
	const dynamicTrack = buildDynamicTrack(
		progression.completedNodeIds,
		progression.currentNodeId
	);

	return {
		track: {
			...dynamicTrack,
			earnedXP: progression.totalXP
		},
		progression: {
			totalXP: progression.totalXP,
			level: progression.level,
			currentNodeId: progression.currentNodeId,
			currentTrackId: progression.currentTrackId,
			completedNodeIds: progression.completedNodeIds,
			lastActivityAt: progression.lastActivityAt?.toISOString() ?? null
		}
	};
};
