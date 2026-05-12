// ─── Types ───────────────────────────────────────────────────────────────────

export type LessonStepType = 'intro' | 'micro' | 'example' | 'interaction' | 'quiz' | 'completion';

export interface KeywordHighlight {
	word: string;
	meaning: string;
}

export interface ContentBlock {
	type: 'paragraph' | 'tip' | 'highlight-list';
	text?: string;
	items?: string[];
	keywords?: KeywordHighlight[];
}

export interface ExampleSegment {
	label: string;
	text: string;
	color: 'purple' | 'blue' | 'green' | 'amber';
}

// Interaction types
export type InteractionType = 'identify' | 'match' | 'choose-structure';

export interface IdentifyInteraction {
	type: 'identify';
	prompt: string;
	paragraph: string;
	correctLabel: string;
	options: string[];
}

export interface MatchPair {
	term: string;
	definition: string;
}
export interface MatchInteraction {
	type: 'match';
	prompt: string;
	pairs: MatchPair[];
}

export interface ChooseStructureInteraction {
	type: 'choose-structure';
	prompt: string;
	question: string;
	options: string[];
	correctIndex: number;
}

export type Interaction = IdentifyInteraction | MatchInteraction | ChooseStructureInteraction;

export interface QuizQuestion {
	id: string;
	question: string;
	options: string[];
	correctIndex: number;
	explanation: string;
}

export interface LessonData {
	id: string;
	title: string;
	chapterLabel: string;
	chapterNumber: number;
	xpReward: number;
	durationMinutes: number;
	totalSteps: number;

	intro: {
		heading: string;
		subtext: string;
		icon: string;
	};

	microLesson: {
		title: string;
		blocks: ContentBlock[];
	};

	examples: ExampleSegment[];

	interaction: Interaction;

	quiz: QuizQuestion[];

	nextLesson?: {
		id: string;
		title: string;
	};
}

// ─── Mock Lesson Data ─────────────────────────────────────────────────────────

export const mockLessons: Record<string, LessonData> = {
	'node-2-3': {
		id: 'node-2-3',
		title: 'Struktur Dasar Teks Deskripsi',
		chapterLabel: 'BAB 2',
		chapterNumber: 2,
		xpReward: 20,
		durationMinutes: 6,
		totalSteps: 6,

		intro: {
			heading: 'Yuk, kenali\nstruktur teks deskripsi!',
			subtext:
				'Setiap teks deskripsi punya "kerangka" yang jelas. Pelajaran ini akan membantumu memahami dan mengenalinya.',
			icon: '🏗️'
		},

		microLesson: {
			title: 'Struktur Teks Deskripsi',
			blocks: [
				{
					type: 'paragraph',
					text: 'Teks deskripsi memiliki dua bagian utama yang selalu hadir — bagian **identifikasi** dan bagian **deskripsi bagian**.',
					keywords: [
						{ word: 'identifikasi', meaning: 'Pengenalan objek secara umum' },
						{ word: 'deskripsi bagian', meaning: 'Penjelasan detail tiap bagian objek' }
					]
				},
				{
					type: 'highlight-list',
					items: [
						'📌 **Identifikasi** — Memperkenalkan objek secara umum. Siapa/apa objeknya?',
						'🔍 **Deskripsi Bagian** — Menjelaskan detail, ciri-ciri, dan karakteristik objek.'
					]
				},
				{
					type: 'tip',
					text: 'Bayangkan kamu sedang mendeskripsikan rumah. Pertama kamu sebutkan "ini rumahku" (identifikasi), lalu kamu ceritakan ruangan-ruangannya satu per satu (deskripsi bagian).'
				}
			]
		},

		examples: [
			{
				label: 'Identifikasi',
				color: 'purple',
				text: 'Pantai Pulau Merah merupakan salah satu pantai terindah di Kabupaten Banyuwangi, Jawa Timur. Pantai ini terkenal dengan pasir putihnya yang lembut dan ombaknya yang bersahabat.'
			},
			{
				label: 'Deskripsi Bagian',
				color: 'blue',
				text: 'Garis pantainya membentang sekitar dua kilometer dengan deretan pohon cemara di sepanjang tepinya. Warna air lautnya biru kehijauan, jernih hingga terlihat dasar berpasirnya.'
			},
			{
				label: 'Deskripsi Bagian',
				color: 'green',
				text: 'Di ujung barat pantai terdapat sebuah bukit kecil berbatu berwarna merah bata — itulah yang menjadi asal nama "Pulau Merah". Saat senja, langit di atasnya berubah menjadi gradasi oranye keemasan yang memukau.'
			}
		],

		interaction: {
			type: 'identify',
			prompt: 'Paragraf di bawah ini termasuk bagian apa dari teks deskripsi?',
			paragraph:
				'Kucing Persia merupakan salah satu ras kucing paling populer di dunia. Dikenal dengan bulunya yang panjang, mewah, dan wajahnya yang datar, kucing ini berasal dari Persia (kini Iran) dan telah menjadi favorit pecinta kucing di seluruh dunia selama berabad-abad.',
			correctLabel: 'Identifikasi',
			options: ['Identifikasi', 'Deskripsi Bagian', 'Penutup', 'Pendahuluan']
		},

		quiz: [
			{
				id: 'q1',
				question: 'Apa fungsi utama bagian "Identifikasi" dalam teks deskripsi?',
				options: [
					'Menjelaskan detail dan ciri-ciri objek secara rinci',
					'Memperkenalkan objek secara umum kepada pembaca',
					'Memberikan kesimpulan tentang objek',
					'Membandingkan objek dengan benda lain'
				],
				correctIndex: 1,
				explanation:
					'Bagian Identifikasi berfungsi untuk memperkenalkan objek kepada pembaca secara umum — menyebutkan nama, jenis, dan gambaran awal tentang objek.'
			},
			{
				id: 'q2',
				question: 'Manakah kalimat yang termasuk bagian "Deskripsi Bagian"?',
				options: [
					'Gunung Bromo adalah gunung berapi aktif di Jawa Timur.',
					'Gunung Bromo merupakan salah satu destinasi wisata terkenal di Indonesia.',
					'Kawahnya mengeluarkan asap putih tebal yang mengepul ke langit biru.',
					'Bromo dikenal luas oleh wisatawan mancanegara.'
				],
				correctIndex: 2,
				explanation:
					'Kalimat "Kawahnya mengeluarkan asap putih tebal..." menggambarkan detail spesifik dari objek (Gunung Bromo), sehingga termasuk bagian Deskripsi Bagian.'
			},
			{
				id: 'q3',
				question: 'Urutan struktur yang benar dalam teks deskripsi adalah...',
				options: [
					'Deskripsi Bagian → Identifikasi',
					'Identifikasi → Deskripsi Bagian',
					'Pendahuluan → Isi → Penutup',
					'Argumen → Fakta → Kesimpulan'
				],
				correctIndex: 1,
				explanation:
					'Teks deskripsi dimulai dengan Identifikasi (pengenalan objek) diikuti Deskripsi Bagian (penjelasan detail). Ini adalah urutan standar dalam teks deskriptif.'
			}
		],

		nextLesson: {
			id: 'node-2-4',
			title: 'Kuis: Analisis Struktur'
		}
	},

	'node-1-1': {
		id: 'node-1-1',
		title: 'Pengertian Teks Deskripsi',
		chapterLabel: 'BAB 1',
		chapterNumber: 1,
		xpReward: 10,
		durationMinutes: 4,
		totalSteps: 6,

		intro: {
			heading: 'Apa itu teks\ndeskripsi?',
			subtext:
				'Mulai dari dasar! Pahami pengertian dan tujuan teks deskripsi sebelum melangkah lebih jauh.',
			icon: '📖'
		},

		microLesson: {
			title: 'Mengenal Teks Deskripsi',
			blocks: [
				{
					type: 'paragraph',
					text: '**Teks deskripsi** adalah teks yang menggambarkan suatu objek — bisa orang, tempat, benda, atau hewan — secara rinci sehingga pembaca seolah bisa merasakan kehadirannya.',
					keywords: [
						{ word: 'teks deskripsi', meaning: 'Teks yang menggambarkan objek secara rinci' }
					]
				},
				{
					type: 'highlight-list',
					items: [
						'🎯 **Tujuannya**: Membuat pembaca "merasakan" objek melalui kata-kata.',
						'📷 **Bayangkan**: Teks deskripsi seperti "foto dalam kata-kata".',
						'🗣️ **Gunanya**: Sering dipakai dalam cerita, iklan, wisata, dan laporan.'
					]
				},
				{
					type: 'tip',
					text: 'Saat kamu menjelaskan rumahmu kepada teman lewat chat — itulah teks deskripsi! Kamu menggambarkan detail agar temanmu bisa membayangkannya.'
				}
			]
		},

		examples: [
			{
				label: 'Contoh Teks Deskripsi',
				color: 'purple',
				text: 'Kelas 7A adalah ruangan yang cerah dan semangat. Dindingnya berwarna krem, dihiasi dengan karya seni siswa yang berwarna-warni. Dua puluh delapan meja belajar tersusun rapi dalam empat baris, menghadap ke papan tulis putih yang bersih di bagian depan.'
			},
			{
				label: 'Yang Dideskripsikan',
				color: 'amber',
				text: 'Objek: Kelas 7A\nDetail: Warna dinding, dekorasi, jumlah meja, posisi furnitur\nSudut pandang: Pembaca seolah melihat langsung ruangannya'
			}
		],

		interaction: {
			type: 'choose-structure',
			prompt: 'Pilih jawaban yang benar!',
			question: 'Teks deskripsi paling tepat digunakan untuk...',
			options: [
				'Menceritakan urutan kejadian dari awal hingga akhir',
				'Menggambarkan ciri-ciri dan detail suatu objek agar terbayangkan',
				'Membuktikan suatu pendapat dengan argumen dan fakta',
				'Memberikan langkah-langkah cara melakukan sesuatu'
			],
			correctIndex: 1
		},

		quiz: [
			{
				id: 'q1',
				question: 'Apa tujuan utama teks deskripsi?',
				options: [
					'Menghibur pembaca dengan cerita yang menarik',
					'Menggambarkan objek agar pembaca dapat membayangkannya',
					'Mempengaruhi pendapat pembaca',
					'Menjelaskan urutan langkah-langkah'
				],
				correctIndex: 1,
				explanation:
					'Teks deskripsi bertujuan untuk menggambarkan objek secara rinci sehingga pembaca dapat membayangkan objek tersebut seolah-olah mereka melihatnya langsung.'
			},
			{
				id: 'q2',
				question: 'Objek apa saja yang bisa dideskripsikan dalam teks deskripsi?',
				options: [
					'Hanya benda mati',
					'Hanya manusia dan hewan',
					'Orang, tempat, benda, atau hewan',
					'Hanya kejadian dan peristiwa'
				],
				correctIndex: 2,
				explanation:
					'Teks deskripsi dapat menggambarkan apa saja — orang, tempat, benda, atau hewan — selama penggambarannya dilakukan secara rinci dan hidup.'
			},
			{
				id: 'q3',
				question: 'Mana yang merupakan contoh teks deskripsi?',
				options: [
					'"Pertama, rebus air hingga mendidih. Kedua, masukkan mie..."',
					'"Menurut saya, olahraga sangat penting karena..."',
					'"Danau itu biru jernih, dikelilingi perbukitan hijau yang menjulang tinggi..."',
					'"Pada tahun 1945, Indonesia memproklamasikan kemerdekaan..."'
				],
				correctIndex: 2,
				explanation:
					'Kalimat tentang danau yang biru jernih dan perbukitan hijau adalah contoh teks deskripsi karena menggambarkan objek (danau) secara visual dan rinci.'
			}
		],

		nextLesson: {
			id: 'node-1-2',
			title: 'Contoh Teks dalam Kehidupan'
		}
	}
};

export function getLessonById(id: string): LessonData | null {
	return mockLessons[id] ?? null;
}
