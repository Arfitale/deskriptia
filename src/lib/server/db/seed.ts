import { db } from './index';
import { materials, quizzes, questions } from './schema';

const materialSeed = [
	{
		slug: 'pantai-parangtritis',
		title: 'Pantai Parangtritis',
		content: `# Pantai Parangtritis

Pantai Parangtritis berada di Yogyakarta dan terkenal dengan ombaknya yang kuat.

## Ciri-ciri
- Pasir hitam yang luas
- Pemandangan matahari terbenam
- Suara ombak yang khas`,
		quiz: {
			passScore: 70,
			questions: [
				{
					prompt: 'Pantai Parangtritis berada di kota apa?',
					options: ['Bandung', 'Yogyakarta', 'Surabaya', 'Medan'],
					correctOption: 1
				},
				{
					prompt: 'Apa ciri pasir di Pantai Parangtritis?',
					options: ['Putih', 'Merah', 'Hitam', 'Abu-abu'],
					correctOption: 2
				}
			]
		}
	},
	{
		slug: 'pasar-tradisional',
		title: 'Pasar Tradisional',
		content: `# Pasar Tradisional

Pasar tradisional adalah tempat bertemunya penjual dan pembeli secara langsung.

## Suasana
- Ramai sejak pagi
- Banyak pilihan barang
- Interaksi tawar-menawar`,
		quiz: {
			passScore: 70,
			questions: [
				{
					prompt: 'Kapan pasar tradisional biasanya mulai ramai?',
					options: ['Malam hari', 'Siang hari', 'Sore hari', 'Pagi hari'],
					correctOption: 3
				},
				{
					prompt: 'Interaksi yang khas di pasar tradisional adalah?',
					options: ['Diskusi online', 'Tawar-menawar', 'Rapat', 'Presentasi'],
					correctOption: 1
				}
			]
		}
	}
];

async function run() {
	await db.delete(questions);
	await db.delete(quizzes);
	await db.delete(materials);

	for (const material of materialSeed) {
		const [insertedMaterial] = await db
			.insert(materials)
			.values({
				slug: material.slug,
				title: material.title,
				content: material.content
			})
			.returning({ id: materials.id });

		const [insertedQuiz] = await db
			.insert(quizzes)
			.values({
				materialId: insertedMaterial.id,
				passScore: material.quiz.passScore
			})
			.returning({ id: quizzes.id });

		await db.insert(questions).values(
			material.quiz.questions.map((question) => ({
				quizId: insertedQuiz.id,
				prompt: question.prompt,
				options: question.options,
				correctOption: question.correctOption
			}))
		);
	}
}

run()
	.then(() => {
		console.log('Seed completed');
		process.exit(0);
	})
	.catch((error) => {
		console.error('Seed failed', error);
		process.exit(1);
	});
