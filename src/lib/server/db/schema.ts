import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const materials = pgTable('materials', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull().unique(),
	title: text('title').notNull(),
	content: text('content').notNull()
});

export const quizzes = pgTable('quizzes', {
	id: serial('id').primaryKey(),
	materialId: integer('material_id')
		.notNull()
		.references(() => materials.id, { onDelete: 'cascade' }),
	passScore: integer('pass_score').notNull().default(70)
});

export const questions = pgTable('questions', {
	id: serial('id').primaryKey(),
	quizId: integer('quiz_id')
		.notNull()
		.references(() => quizzes.id, { onDelete: 'cascade' }),
	prompt: text('prompt').notNull(),
	options: jsonb('options').$type<string[]>().notNull(),
	correctOption: integer('correct_option').notNull()
});

export const userProgress = pgTable('user_progress', {
	id: serial('id').primaryKey(),
	userId: text('user_id').notNull(),
	materialId: integer('material_id')
		.notNull()
		.references(() => materials.id, { onDelete: 'cascade' }),
	quizScore: integer('quiz_score').notNull().default(0),
	attemptCount: integer('attempt_count').notNull().default(0),
	isQuizPassed: boolean('is_quiz_passed').notNull().default(false)
});

export const drafts = pgTable('drafts', {
	id: serial('id').primaryKey(),
	userId: text('user_id').notNull(),
	materialId: integer('material_id')
		.notNull()
		.references(() => materials.id, { onDelete: 'cascade' }),
	data: jsonb('data')
		.$type<{
			judul: string;
			deskripsiObjek: string;
			simpulan: string;
		}>()
		.notNull()
		.default({
			judul: '',
			deskripsiObjek: '',
			simpulan: ''
		}),
	updatedAt: timestamp('updated_at', { withTimezone: false }).notNull().defaultNow()
});

export * from './auth.schema';
