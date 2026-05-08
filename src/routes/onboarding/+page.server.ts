import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	getUserOnboardingStatus,
	completeOnboarding
} from '$lib/server/guards/onboarding';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	const status = await getUserOnboardingStatus(locals.user.id);

	// Already completed onboarding — send to pretest or dashboard
	if (status.hasCompletedOnboarding) {
		if (!status.hasCompletedPretest) {
			throw redirect(302, '/pretest');
		}
		throw redirect(302, '/dashboard');
	}

	return {
		userName: locals.user.name
	};
};

export const actions: Actions = {
	complete: async ({ locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth');
		}

		await completeOnboarding(locals.user.id);
		throw redirect(302, '/pretest');
	},

	skip: async ({ locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth');
		}

		// Skip also marks onboarding as done so it never shows again
		await completeOnboarding(locals.user.id);
		throw redirect(302, '/pretest');
	}
};
