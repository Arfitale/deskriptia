export type NodeType = 'lesson' | 'quiz' | 'challenge' | 'checkpoint' | 'current';
export type NodeState = 'completed' | 'current' | 'upcoming' | 'locked';

export interface LearningNode {
	id: string;
	type: NodeType;
	state: NodeState;
	title: string;
	description: string;
	duration: number; // in minutes
	xp: number;
}

export interface Chapter {
	id: string;
	title: string;
	subtitle: string;
	description?: string;
	nodes: LearningNode[];
}

export interface LearnTrack {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	totalXP: number;
	earnedXP: number;
	totalLessons: number;
	completedLessons: number;
	chapters: Chapter[];
}

export const learnTrack: LearnTrack = {
	id: 'track-1',
	title: 'Track 1 — Teks Deskripsi Dasar',
	subtitle: 'Mulai perjalanan belajarmu',
	description:
		'Kuasai dasar-dasar teks deskriptif Bahasa Indonesia melalui materi terstruktur, kuis, dan tantangan menulis.',
	totalXP: 380,
	earnedXP: 110,
	totalLessons: 15,
	completedLessons: 7,
	chapters: [
		{
			id: 'bab-1',
			title: 'BAB 1',
			subtitle: 'Pengenalan Teks Deskripsi',
			description: 'Pahami konsep dasar dan tujuan teks deskriptif.',
			nodes: [
				{
					id: 'node-1-1',
					type: 'lesson',
					state: 'completed',
					title: 'Pengertian Teks Deskripsi',
					description: 'Apa itu teks deskriptif dan apa tujuannya?',
					duration: 4,
					xp: 10
				},
				{
					id: 'node-1-2',
					type: 'lesson',
					state: 'completed',
					title: 'Contoh Teks dalam Kehidupan',
					description: 'Temukan contoh nyata teks deskriptif di sekitarmu.',
					duration: 3,
					xp: 10
				},
				{
					id: 'node-1-3',
					type: 'quiz',
					state: 'completed',
					title: 'Kuis: Pemahaman Dasar',
					description: 'Uji pemahamanmu tentang konsep dasar.',
					duration: 5,
					xp: 20
				},
				{
					id: 'node-1-4',
					type: 'lesson',
					state: 'completed',
					title: 'Ciri Khas Teks Deskripsi',
					description: 'Kenali karakteristik yang membedakan teks deskriptif.',
					duration: 4,
					xp: 10
				},
				{
					id: 'node-1-5',
					type: 'checkpoint',
					state: 'completed',
					title: 'Checkpoint: Bab 1 Selesai!',
					description: 'Kamu telah menguasai dasar-dasar teks deskripsi.',
					duration: 2,
					xp: 30
				}
			]
		},
		{
			id: 'bab-2',
			title: 'BAB 2',
			subtitle: 'Struktur Teks Deskripsi',
			description: 'Pelajari bagaimana teks deskriptif disusun secara sistematis.',
			nodes: [
				{
					id: 'node-2-1',
					type: 'lesson',
					state: 'completed',
					title: 'Bagian Identifikasi',
					description: 'Cara memperkenalkan objek yang dideskripsikan.',
					duration: 4,
					xp: 10
				},
				{
					id: 'node-2-2',
					type: 'lesson',
					state: 'completed',
					title: 'Bagian Deskripsi Bagian',
					description: 'Cara menjabarkan detail objek secara rinci.',
					duration: 5,
					xp: 10
				},
				{
					id: 'node-2-3',
					type: 'current',
					state: 'current',
					title: 'Struktur Dasar Lengkap',
					description: 'Gabungkan semua bagian dalam satu teks utuh.',
					duration: 6,
					xp: 15
				},
				{
					id: 'node-2-4',
					type: 'quiz',
					state: 'upcoming',
					title: 'Kuis: Analisis Struktur',
					description: 'Identifikasi struktur dari teks-teks yang diberikan.',
					duration: 8,
					xp: 25
				},
				{
					id: 'node-2-5',
					type: 'challenge',
					state: 'locked',
					title: 'Tantangan: Susun Paragraf',
					description: 'Susun kembali paragraf acak menjadi teks yang benar.',
					duration: 10,
					xp: 30
				},
				{
					id: 'node-2-6',
					type: 'checkpoint',
					state: 'locked',
					title: 'Checkpoint: Bab 2 Selesai!',
					description: 'Kamu telah memahami struktur teks deskripsi.',
					duration: 2,
					xp: 35
				}
			]
		},
		{
			id: 'bab-3',
			title: 'BAB 3',
			subtitle: 'Analisis & Penulisan',
			description: 'Terapkan pengetahuanmu untuk menganalisis dan menulis teks sendiri.',
			nodes: [
				{
					id: 'node-3-1',
					type: 'lesson',
					state: 'locked',
					title: 'Kaidah Bahasa Teks Deskripsi',
					description: 'Frasa nomina, kata sifat, dan kata kerja aktif.',
					duration: 6,
					xp: 15
				},
				{
					id: 'node-3-2',
					type: 'lesson',
					state: 'locked',
					title: 'Kalimat Efektif & Rinci',
					description: 'Cara menulis kalimat deskriptif yang hidup dan detail.',
					duration: 5,
					xp: 15
				},
				{
					id: 'node-3-3',
					type: 'quiz',
					state: 'locked',
					title: 'Kuis: Kaidah Bahasa',
					description: 'Uji kemampuanmu dalam penggunaan kaidah bahasa.',
					duration: 10,
					xp: 25
				},
				{
					id: 'node-3-4',
					type: 'challenge',
					state: 'locked',
					title: 'Tantangan: Menulis Teks Sendiri',
					description: 'Tulis teks deskriptif lengkap tentang objek pilihanmu.',
					duration: 15,
					xp: 40
				},
				{
					id: 'node-3-5',
					type: 'checkpoint',
					state: 'locked',
					title: '🎓 Checkpoint Akhir: Track Selesai!',
					description: 'Selamat! Kamu telah menyelesaikan seluruh track ini.',
					duration: 3,
					xp: 50
				}
			]
		}
	]
};
