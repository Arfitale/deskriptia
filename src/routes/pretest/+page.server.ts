import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	getUserOnboardingStatus,
	completePretest
} from '$lib/server/guards/onboarding';
import {
	PRETEST_QUESTIONS,
	calculatePretestScore
} from '$lib/data/pretest-questions';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	const status = await getUserOnboardingStatus(locals.user.id);

	// Onboarding not done yet — send back
	if (!status.hasCompletedOnboarding) {
		throw redirect(302, '/onboarding');
	}

	// Already completed pretest — go to dashboard
	if (status.hasCompletedPretest) {
		throw redirect(302, '/dashboard');
	}

	return {
		userName: locals.user.name
	};
};

export const actions: Actions = {
	submit: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth');
		}

		const formData = await request.formData();
		const rawAnswers = formData.getAll('answer');

		// Parse answers into numbers, validate length
		const answers = rawAnswers.map((a) => {
			const n = Number(a);
			return Number.isNaN(n) ? -1 : n;
		});

		if (answers.length !== PRETEST_QUESTIONS.length) {
			return { success: false as const, error: 'Semua soal harus dijawab.' };
		}

		const result = calculatePretestScore(answers);

		await completePretest(locals.user.id, result.score);

		// Return result to client instead of redirecting —
		// so the page can show the result summary screen
		return {
			success: true as const,
			score: result.score,
			correctCount: result.correctCount,
			totalQuestions: result.totalQuestions
		};
	}
};
