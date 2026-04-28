import { json } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { questions, quizzes, userProgress } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.user) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	const quizId = Number(params.id);
	if (!quizId) {
		return json({ message: 'Invalid quiz id' }, { status: 400 });
	}

	const payload = (await request.json()) as { answers?: Record<string, number> };
	const userAnswers = payload.answers ?? {};

	const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, quizId)).limit(1);
	if (!quiz) {
		return json({ message: 'Quiz not found' }, { status: 404 });
	}

	const quizQuestions = await db.select().from(questions).where(eq(questions.quizId, quizId));
	if (quizQuestions.length === 0) {
		return json({ message: 'Quiz questions not found' }, { status: 404 });
	}

	const correct = quizQuestions.reduce((acc, question) => {
		const selected = userAnswers[String(question.id)];
		return selected === question.correctOption ? acc + 1 : acc;
	}, 0);
	const score = Math.round((correct / quizQuestions.length) * 100);
	const isPassed = score >= quiz.passScore;

	const progressRows = await db
		.select()
		.from(userProgress)
		.where(and(eq(userProgress.userId, locals.user.id), eq(userProgress.materialId, quiz.materialId)))
		.limit(1);

	if (progressRows[0]) {
		await db
			.update(userProgress)
			.set({
				quizScore: score,
				attemptCount: progressRows[0].attemptCount + 1,
				isQuizPassed: progressRows[0].isQuizPassed || isPassed
			})
			.where(eq(userProgress.id, progressRows[0].id));
	} else {
		await db.insert(userProgress).values({
			userId: locals.user.id,
			materialId: quiz.materialId,
			quizScore: score,
			attemptCount: 1,
			isQuizPassed: isPassed
		});
	}

	return json({ score, isPassed });
};
