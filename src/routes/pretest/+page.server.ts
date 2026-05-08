import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	getUserOnboardingStatus,
	completePretest
} from '$lib/server/guards/onboarding';

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
		const answers = formData.getAll('answer');

		// For MVP: just accept any submission — real scoring comes later
		// You could store answers in a separate table if needed
		const _submittedAnswers = answers.map((a) => a.toString());

		await completePretest(locals.user.id);
		throw redirect(302, '/dashboard');
	}
};
