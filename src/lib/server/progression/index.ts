import { db } from '$lib/server/db';
import { lessonProgress, userProgression } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { calculateLevel } from '$lib/utils/xp';
import { learnTrack } from '$lib/data/learnTrack';
import type { NodeType } from '$lib/data/learnTrack';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface UserProgressionData {
	totalXP: number;
	level: number;
	currentNodeId: string;
	currentTrackId: string;
	completedNodeIds: string[];
	lastActivityAt: Date | null;
}

// ─── Read Operations ─────────────────────────────────────────────────────────

/** Get full progression data for a user */
export async function getUserProgression(userId: string): Promise<UserProgressionData> {
	// Get or create user progression record
	const [progression] = await db
		.select()
		.from(userProgression)
		.where(eq(userProgression.userId, userId))
		.limit(1);

	// Get all completed lessons
	const completedLessons = await db
		.select({ nodeId: lessonProgress.nodeId })
		.from(lessonProgress)
		.where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.isCompleted, true)));

	const completedNodeIds = completedLessons.map((l) => l.nodeId);

	if (!progression) {
		// First time — create default record
		await db.insert(userProgression).values({
			userId,
			totalXP: 0,
			level: 1,
			currentNodeId: getFirstUnlockedNodeId(completedNodeIds),
			currentTrackId: 'track-1'
		});

		return {
			totalXP: 0,
			level: 1,
			currentNodeId: getFirstUnlockedNodeId(completedNodeIds),
			currentTrackId: 'track-1',
			completedNodeIds,
			lastActivityAt: null
		};
	}

	return {
		totalXP: progression.totalXP,
		level: progression.level,
		currentNodeId: progression.currentNodeId ?? 'node-1-1',
		currentTrackId: progression.currentTrackId ?? 'track-1',
		completedNodeIds,
		lastActivityAt: progression.lastActivityAt
	};
}

// ─── Write Operations ────────────────────────────────────────────────────────

/** Complete a lesson node and update progression */
export async function completeLesson(
	userId: string,
	nodeId: string,
	xpEarned: number
): Promise<{ newTotalXP: number; newLevel: number; previousLevel: number; nextNodeId: string | null }> {
	// Check if already completed
	const [existing] = await db
		.select()
		.from(lessonProgress)
		.where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.nodeId, nodeId)))
		.limit(1);

	if (existing?.isCompleted) {
		// Already completed — don't grant XP again
		const progression = await getUserProgression(userId);
		return {
			newTotalXP: progression.totalXP,
			newLevel: progression.level,
			previousLevel: progression.level,
			nextNodeId: getNextNodeId(nodeId)
		};
	}

	// Insert or update lesson progress
	if (existing) {
		await db
			.update(lessonProgress)
			.set({
				isCompleted: true,
				xpEarned,
				completedAt: new Date()
			})
			.where(eq(lessonProgress.id, existing.id));
	} else {
		await db.insert(lessonProgress).values({
			userId,
			nodeId,
			trackId: 'track-1',
			isCompleted: true,
			xpEarned,
			completedAt: new Date()
		});
	}

	// Update user progression
	const [currentProgression] = await db
		.select()
		.from(userProgression)
		.where(eq(userProgression.userId, userId))
		.limit(1);

	const previousLevel = currentProgression?.level ?? 1;
	const previousXP = currentProgression?.totalXP ?? 0;
	const newTotalXP = previousXP + xpEarned;
	const newLevel = calculateLevel(newTotalXP);
	const nextNodeId = getNextNodeId(nodeId);

	if (currentProgression) {
		await db
			.update(userProgression)
			.set({
				totalXP: newTotalXP,
				level: newLevel,
				currentNodeId: nextNodeId ?? currentProgression.currentNodeId,
				lastActivityAt: new Date()
			})
			.where(eq(userProgression.userId, userId));
	} else {
		await db.insert(userProgression).values({
			userId,
			totalXP: newTotalXP,
			level: newLevel,
			currentNodeId: nextNodeId ?? 'node-1-1',
			currentTrackId: 'track-1',
			lastActivityAt: new Date()
		});
	}

	return { newTotalXP, newLevel, previousLevel, nextNodeId };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Get all node IDs in order from the learn track */
function getAllNodeIds(): string[] {
	return learnTrack.chapters.flatMap((chapter) => chapter.nodes.map((node) => node.id));
}

/** Get the next node ID after a given node */
function getNextNodeId(currentNodeId: string): string | null {
	const allIds = getAllNodeIds();
	const currentIndex = allIds.indexOf(currentNodeId);
	if (currentIndex === -1 || currentIndex >= allIds.length - 1) return null;
	return allIds[currentIndex + 1];
}

/** Get the first unlocked (not yet completed) node */
function getFirstUnlockedNodeId(completedNodeIds: string[]): string {
	const allIds = getAllNodeIds();
	for (const id of allIds) {
		if (!completedNodeIds.includes(id)) return id;
	}
	return allIds[allIds.length - 1]; // all completed
}

/** Get the node type for a given node ID */
export function getNodeType(nodeId: string): NodeType {
	for (const chapter of learnTrack.chapters) {
		for (const node of chapter.nodes) {
			if (node.id === nodeId) return node.type;
		}
	}
	return 'lesson';
}

/** Build the track with dynamic states based on user progress */
export function buildDynamicTrack(completedNodeIds: string[], currentNodeId: string) {
	const allIds = getAllNodeIds();

	return {
		...learnTrack,
		chapters: learnTrack.chapters.map((chapter) => ({
			...chapter,
			nodes: chapter.nodes.map((node) => {
				let state: 'completed' | 'current' | 'upcoming' | 'locked';

				if (completedNodeIds.includes(node.id)) {
					state = 'completed';
				} else if (node.id === currentNodeId) {
					state = 'current';
				} else {
					// Check if the previous node is completed
					const nodeIndex = allIds.indexOf(node.id);
					const prevNodeId = nodeIndex > 0 ? allIds[nodeIndex - 1] : null;
					if (prevNodeId && completedNodeIds.includes(prevNodeId)) {
						state = 'upcoming';
					} else if (nodeIndex === 0) {
						state = 'current'; // First node is always accessible
					} else {
						state = 'locked';
					}
				}

				return { ...node, state };
			})
		})),
		completedLessons: completedNodeIds.length,
		earnedXP: 0 // Will be filled from progression data
	};
}
