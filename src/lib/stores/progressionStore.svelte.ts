import { getXPForNextLevel, getLevelTitle } from '$lib/utils/xp';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProgressionState {
	totalXP: number;
	level: number;
	levelTitle: string;
	currentNodeId: string;
	currentTrackId: string;
	completedNodeIds: string[];
	lastActivityAt: Date | null;
	xpProgress: {
		currentLevel: number;
		currentLevelXP: number;
		nextLevelXP: number;
		progressInLevel: number;
		progressPercentage: number;
	};
}

// ─── Reactive Progression Store ──────────────────────────────────────────────
// Uses Svelte 5 runes for reactive state management

function createProgressionStore() {
	let state = $state<ProgressionState>({
		totalXP: 0,
		level: 1,
		levelTitle: getLevelTitle(1),
		currentNodeId: 'node-1-1',
		currentTrackId: 'track-1',
		completedNodeIds: [],
		lastActivityAt: null,
		xpProgress: getXPForNextLevel(0)
	});

	return {
		get state() {
			return state;
		},

		/** Initialize store from server data */
		initialize(data: {
			totalXP: number;
			level: number;
			currentNodeId: string;
			currentTrackId: string;
			completedNodeIds: string[];
			lastActivityAt: Date | null;
		}) {
			state = {
				...data,
				levelTitle: getLevelTitle(data.level),
				xpProgress: getXPForNextLevel(data.totalXP)
			};
		},

		/** Update after lesson completion */
		completeLesson(nodeId: string, xpEarned: number, nextNodeId: string | null) {
			if (state.completedNodeIds.includes(nodeId)) return;

			const newTotalXP = state.totalXP + xpEarned;
			const xpProgress = getXPForNextLevel(newTotalXP);

			state = {
				...state,
				totalXP: newTotalXP,
				level: xpProgress.currentLevel,
				levelTitle: getLevelTitle(xpProgress.currentLevel),
				currentNodeId: nextNodeId ?? state.currentNodeId,
				completedNodeIds: [...state.completedNodeIds, nodeId],
				lastActivityAt: new Date(),
				xpProgress
			};
		},

		/** Check if a node is completed */
		isNodeCompleted(nodeId: string): boolean {
			return state.completedNodeIds.includes(nodeId);
		},

		/** Check if a node is accessible (not locked) */
		isNodeAccessible(nodeId: string, allNodeIds: string[]): boolean {
			const nodeIndex = allNodeIds.indexOf(nodeId);
			if (nodeIndex === 0) return true; // First node always accessible
			if (state.completedNodeIds.includes(nodeId)) return true; // Already completed
			// Previous node must be completed
			const prevId = allNodeIds[nodeIndex - 1];
			return prevId ? state.completedNodeIds.includes(prevId) : false;
		}
	};
}

export const progressionStore = createProgressionStore();
