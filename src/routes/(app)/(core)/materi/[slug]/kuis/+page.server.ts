import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { materials, questions, quizzes, userProgress } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth');
	}

	const materialRows = await db
		.select()
		.from(materials)
		.where(eq(materials.slug, params.slug))
		.limit(1);
	const material = materialRows[0];
	if (!material) {
		throw error(404, 'Material not found');
	}

	const quizRows = await db
		.select()
		.from(quizzes)
		.where(eq(quizzes.materialId, material.id))
		.limit(1);
	const quiz = quizRows[0];
	if (!quiz) {
		throw error(404, 'Quiz not found');
	}

	const quizQuestions = await db.select().from(questions).where(eq(questions.quizId, quiz.id));
	const progressRows = await db
		.select()
		.from(userProgress)
		.where(and(eq(userProgress.userId, locals.user.id), eq(userProgress.materialId, material.id)))
		.limit(1);

	return {
		material,
		quiz,
		questions: quizQuestions.map((question) => ({
			id: question.id,
			prompt: question.prompt,
			options: question.options
		})),
		progress: progressRows[0] ?? null
	};
};
