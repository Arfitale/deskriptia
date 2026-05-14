import { error, redirect } from '@sveltejs/kit';
import { getLessonById } from '$lib/data/lessonData';
import { getUserProgression } from '$lib/server/progression';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	const lesson = getLessonById(params.lessonId);

	if (!lesson) {
		error(404, {
			message: `Pelajaran "${params.lessonId}" tidak ditemukan.`
		});
	}

	// Get progression to check if lesson is accessible
	const progression = await getUserProgression(locals.user.id);

	return {
		lesson,
		progression: {
			totalXP: progression.totalXP,
			level: progression.level,
			currentNodeId: progression.currentNodeId,
			completedNodeIds: progression.completedNodeIds
		}
	};
};
