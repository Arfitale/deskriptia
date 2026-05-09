export type PretestQuestion = {
	id: string;
	prompt: string;
	options: string[];
	correct: number;
};

export const PRETEST_QUESTIONS: PretestQuestion[] = [
	{
		id: 'q1',
		prompt: 'Teks deskripsi bertujuan untuk...',
		options: [
			'Menceritakan suatu peristiwa',
			'Menggambarkan suatu objek secara rinci',
			'Menyampaikan pendapat penulis',
			'Memberikan petunjuk cara membuat sesuatu'
		],
		correct: 1
	},
	{
		id: 'q2',
		prompt: 'Ciri utama teks deskripsi adalah...',
		options: [
			'Menggunakan kata kerja aktif',
			'Berisi langkah-langkah',
			'Menggambarkan objek menggunakan panca indera',
			'Menyajikan data statistik'
		],
		correct: 2
	},
	{
		id: 'q3',
		prompt: 'Manakah yang merupakan kalimat deskripsi?',
		options: [
			'Hari ini cuaca sangat panas',
			'Bunganya berwarna merah muda dengan kelopak lembut yang harum semerbak',
			'Menurut saya, taman ini perlu diperbaiki',
			'Pertama, siapkan bahan-bahan berikut'
		],
		correct: 1
	},
	{
		id: 'q4',
		prompt: 'Struktur teks deskripsi terdiri dari...',
		options: [
			'Orientasi - Komplikasi - Resolusi',
			'Identifikasi - Deskripsi Bagian - Simpulan',
			'Tesis - Argumentasi - Penegasan',
			'Abstrak - Orientasi - Krisis'
		],
		correct: 1
	},
	{
		id: 'q5',
		prompt: 'Kata "indah", "harum", dan "lembut" termasuk jenis kata...',
		options: [
			'Kata benda (nomina)',
			'Kata kerja (verba)',
			'Kata sifat (adjektiva)',
			'Kata keterangan (adverbia)'
		],
		correct: 2
	}
];

/** Points awarded per correct answer */
export const POINTS_PER_QUESTION = 20;

/** Calculate pretest score from user answers against question data */
export function calculatePretestScore(answers: number[]): {
	score: number;
	correctCount: number;
	totalQuestions: number;
} {
	let correctCount = 0;
	for (let i = 0; i < PRETEST_QUESTIONS.length; i++) {
		if (answers[i] === PRETEST_QUESTIONS[i].correct) {
			correctCount++;
		}
	}
	return {
		score: correctCount * POINTS_PER_QUESTION,
		correctCount,
		totalQuestions: PRETEST_QUESTIONS.length
	};
}

/** Get motivational feedback text based on score */
export function getPretestFeedback(score: number): { emoji: string; title: string; message: string } {
	if (score === 100) {
		return {
			emoji: '🌟',
			title: 'Luar Biasa!',
			message:
				'Kamu sudah memiliki pemahaman yang sangat baik tentang teks deskripsi. Mari asah kemampuanmu lebih jauh!'
		};
	}
	if (score >= 60) {
		return {
			emoji: '💪',
			title: 'Bagus Sekali!',
			message:
				'Kamu sudah memiliki dasar yang kuat tentang teks deskripsi. Mari lanjut belajar untuk menguasainya sepenuhnya!'
		};
	}
	return {
		emoji: '🚀',
		title: 'Awal yang Baik!',
		message:
			'Setiap perjalanan dimulai dari langkah pertama. Deskriptia akan membantumu memahami teks deskripsi dengan mudah!'
	};
}
