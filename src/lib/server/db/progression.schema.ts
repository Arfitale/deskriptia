import { pgTable, text, integer, boolean, timestamp, index } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';

// ─── Lesson Progress ─────────────────────────────────────────────────────────
// Tracks individual lesson/node completion per user

export const lessonProgress = pgTable(
	'lesson_progress',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		nodeId: text('node_id').notNull(), // matches LearningNode.id (e.g. "node-1-1")
		trackId: text('track_id').notNull().default('track-1'),
		isCompleted: boolean('is_completed').notNull().default(false),
		xpEarned: integer('xp_earned').notNull().default(0),
		completedAt: timestamp('completed_at'),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('lesson_progress_user_idx').on(table.userId),
		index('lesson_progress_node_idx').on(table.userId, table.nodeId)
	]
);

// ─── User Progression ────────────────────────────────────────────────────────
// Aggregate user-level progression data

export const userProgression = pgTable(
	'user_progression',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id')
			.notNull()
			.unique()
			.references(() => user.id, { onDelete: 'cascade' }),
		totalXP: integer('total_xp').notNull().default(0),
		level: integer('level').notNull().default(1),
		currentNodeId: text('current_node_id').default('node-1-1'),
		currentTrackId: text('current_track_id').default('track-1'),
		lastActivityAt: timestamp('last_activity_at').defaultNow(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	(table) => [index('user_progression_user_idx').on(table.userId)]
);
