import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Fetches the onboarding/pretest status for a given user from the database.
 * Returns the raw flags so callers can decide what to do.
 */
export async function getUserOnboardingStatus(userId: string) {
	const [row] = await db
		.select({
			hasCompletedOnboarding: userTable.hasCompletedOnboarding,
			hasCompletedPretest: userTable.hasCompletedPretest
		})
		.from(userTable)
		.where(eq(userTable.id, userId))
		.limit(1);

	return row ?? { hasCompletedOnboarding: false, hasCompletedPretest: false };
}

/**
 * Route guard: redirects users to the correct step of the onboarding flow.
 *
 * Call this in `+page.server.ts` load functions or layout server loads
 * to enforce the Welcome → Pre-test → Dashboard sequence.
 *
 * Rules:
 * - Not authenticated → /auth
 * - Onboarding incomplete AND not on /onboarding → redirect /onboarding
 * - Pretest incomplete AND not on /pretest → redirect /pretest
 * - Already completed everything AND on /onboarding or /pretest → redirect /dashboard
 */
export async function enforceOnboardingGuard(event: RequestEvent) {
	const { locals, url } = event;
	const path = url.pathname;

	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	const status = await getUserOnboardingStatus(locals.user.id);

	const isOnboardingRoute = path.startsWith('/onboarding');
	const isPretestRoute = path.startsWith('/pretest');

	// User has completed everything — block access to onboarding/pretest
	if (status.hasCompletedOnboarding && status.hasCompletedPretest) {
		if (isOnboardingRoute || isPretestRoute) {
			throw redirect(302, '/dashboard');
		}
		return status;
	}

	// Onboarding not completed — must be on /onboarding
	if (!status.hasCompletedOnboarding) {
		if (!isOnboardingRoute) {
			throw redirect(302, '/onboarding');
		}
		return status;
	}

	// Onboarding done but pretest not completed — must be on /pretest
	if (!status.hasCompletedPretest) {
		if (!isPretestRoute) {
			throw redirect(302, '/pretest');
		}
		return status;
	}

	return status;
}

/**
 * Marks onboarding as completed for a user.
 */
export async function completeOnboarding(userId: string) {
	await db
		.update(userTable)
		.set({ hasCompletedOnboarding: true })
		.where(eq(userTable.id, userId));
}

/**
 * Marks pretest as completed for a user and saves their score.
 */
export async function completePretest(userId: string, score: number) {
	await db
		.update(userTable)
		.set({
			hasCompletedPretest: true,
			pretestScore: score,
			pretestCompletedAt: new Date()
		})
		.where(eq(userTable.id, userId));
}
