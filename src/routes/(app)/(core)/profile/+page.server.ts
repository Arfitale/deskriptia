import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { enforceOnboardingGuard } from '$lib/server/guards/onboarding';
import { getUserProgression } from '$lib/server/progression';
import { getXPForNextLevel, getLevelTitle } from '$lib/utils/xp';
import { learnTrack } from '$lib/data/learnTrack';

export const load: PageServerLoad = async (event) => {
	const { locals } = event;
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	await enforceOnboardingGuard(event);

	const progression = await getUserProgression(locals.user.id);
	const xpProgress = getXPForNextLevel(progression.totalXP);
	const levelTitle = getLevelTitle(progression.level);

	const allNodes = learnTrack.chapters.flatMap((ch) => ch.nodes);
	const completedCount = progression.completedNodeIds.length;
	const trackProgress = allNodes.length > 0
		? Math.round((completedCount / allNodes.length) * 100)
		: 0;

	let completedChaptersCount = 0;
	for (const chapter of learnTrack.chapters) {
		const allCompleted = chapter.nodes.length > 0 && chapter.nodes.every(node => progression.completedNodeIds.includes(node.id));
		if (allCompleted) {
			completedChaptersCount++;
		}
	}

	return {
		userName: locals.user.name,
		joinedAt: new Date(locals.user.createdAt ?? new Date()).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
		progression: {
			totalXP: progression.totalXP,
			level: progression.level,
			levelTitle,
			xpProgress,
			completedCount,
			totalNodes: allNodes.length,
			completedChapters: completedChaptersCount,
			trackProgress,
			completedNodeIds: progression.completedNodeIds
		}
	};
};
