import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { enforceOnboardingGuard } from '$lib/server/guards/onboarding';
import { getUserProgression } from '$lib/server/progression';

export const load: PageServerLoad = async (event) => {
	const { locals } = event;
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	await enforceOnboardingGuard(event);

	const progression = await getUserProgression(locals.user.id);

	return {
		userName: locals.user.name,
		progression: {
			totalXP: progression.totalXP,
			level: progression.level,
		},
		// Using mock data for practice-specific tracking since no db tables exist yet
		incorrectAnswersCount: 4, 
		recentPractice: [
			{ id: '1', title: 'Menyelesaikan Latihan Cepat', type: 'complete' as const, time: 'Baru saja' },
			{ id: '2', title: 'Mendapatkan +15 XP', type: 'xp' as const, time: 'Baru saja' }
		]
	};
};
