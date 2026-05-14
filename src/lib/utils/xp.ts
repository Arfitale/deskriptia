// ─── XP & Level Configuration ────────────────────────────────────────────────
// Lightweight, encouraging progression system

/** XP rewards by node type */
export const XP_REWARDS = {
	lesson: 20,
	quiz: 10,
	challenge: 25,
	checkpoint: 40,
	current: 20 // "current" type nodes are treated as lessons
} as const;

/** Level thresholds — cumulative XP needed to reach each level */
const LEVEL_THRESHOLDS = [
	0, // Level 1
	50, // Level 2
	120, // Level 3
	220, // Level 4
	350, // Level 5
	520, // Level 6
	740, // Level 7
	1000, // Level 8
	1300, // Level 9
	1650 // Level 10
] as const;

/** Level display titles for a warm, educational feel */
export const LEVEL_TITLES: Record<number, string> = {
	1: 'Pemula',
	2: 'Penjelajah',
	3: 'Pelajar Aktif',
	4: 'Pengamat Cermat',
	5: 'Penulis Muda',
	6: 'Deskriptor Terampil',
	7: 'Ahli Deskripsi',
	8: 'Maestro Kata',
	9: 'Sastrawan',
	10: 'Legenda Deskriptia'
};

/** Calculate level from total XP */
export function calculateLevel(totalXP: number): number {
	let level = 1;
	for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
		if (totalXP >= LEVEL_THRESHOLDS[i]) {
			level = i + 1;
			break;
		}
	}
	return level;
}

/** Get XP needed for the next level */
export function getXPForNextLevel(totalXP: number): {
	currentLevel: number;
	currentLevelXP: number;
	nextLevelXP: number;
	progressInLevel: number;
	progressPercentage: number;
} {
	const currentLevel = calculateLevel(totalXP);
	const currentLevelXP = LEVEL_THRESHOLDS[currentLevel - 1] ?? 0;
	const nextLevelXP =
		currentLevel < LEVEL_THRESHOLDS.length
			? LEVEL_THRESHOLDS[currentLevel]
			: LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 500;

	const progressInLevel = totalXP - currentLevelXP;
	const levelRange = nextLevelXP - currentLevelXP;
	const progressPercentage = levelRange > 0 ? Math.min(100, Math.round((progressInLevel / levelRange) * 100)) : 100;

	return {
		currentLevel,
		currentLevelXP,
		nextLevelXP,
		progressInLevel,
		progressPercentage
	};
}

/** Get the title for a given level */
export function getLevelTitle(level: number): string {
	return LEVEL_TITLES[level] ?? LEVEL_TITLES[10]!;
}

/** Get XP reward for a given node type */
export function getXPReward(nodeType: keyof typeof XP_REWARDS): number {
	return XP_REWARDS[nodeType] ?? XP_REWARDS.lesson;
}
