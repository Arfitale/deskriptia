import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
	return {};
};

export const actions: Actions = {
	signInEmail: async ({ request }) => {
		console.log('sign in...');
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		try {
			await auth.api.signInEmail({
				body: { email, password, callbackURL: '/dashboard' }
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Sign in failed', action: 'login' });
			}
			return fail(500, { message: 'Unexpected error', action: 'login' });
		}

		throw redirect(302, '/dashboard');
	},
	signUpEmail: async ({ request }) => {
		console.log('sign up...');
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const name = formData.get('name')?.toString() ?? '';

		try {
			await auth.api.signUpEmail({
				body: { email, password, name, callbackURL: '/dashboard' }
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Sign up failed', action: 'register' });
			}
			return fail(500, { message: 'Unexpected error', action: 'register' });
		}
		console.log(true);
		throw redirect(302, '/dashboard');
	}
};
