import { error } from '@sveltejs/kit';
import { getLessonById } from '$lib/data/lessonData';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const lesson = getLessonById(params.lessonId);

	if (!lesson) {
		error(404, {
			message: `Pelajaran "${params.lessonId}" tidak ditemukan.`
		});
	}

	return { lesson };
};
