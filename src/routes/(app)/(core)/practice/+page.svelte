<script lang="ts">
	import AppCard from '$lib/components/ui/AppCard.svelte';
	import SectionTitle from '$lib/components/ui/SectionTitle.svelte';
	import AnimatedButton from '$lib/components/ui/AnimatedButton.svelte';
	import XPBadge from '$lib/components/ui/XPBadge.svelte';
	import { PenLine, BookOpen, Target, Clock } from '@lucide/svelte';

	const exercises = [
		{
			id: 1,
			type: 'Pilihan Ganda',
			title: 'Identifikasi Struktur Teks',
			description: 'Tentukan bagian identifikasi dan deskripsi pada teks contoh.',
			duration: '5 menit',
			xp: 20,
			icon: Target,
			color: '#9381ff'
		},
		{
			id: 2,
			type: 'Menulis Pendek',
			title: 'Deskripsi Objek Sederhana',
			description: 'Tulis satu paragraf deskripsi tentang benda di sekitarmu.',
			duration: '10 menit',
			xp: 35,
			icon: PenLine,
			color: '#6ee7b7'
		},
		{
			id: 3,
			type: 'Membaca & Memahami',
			title: 'Analisis Teks Deskriptif',
			description: 'Baca teks dan jawab pertanyaan pemahaman mendalam.',
			duration: '8 menit',
			xp: 25,
			icon: BookOpen,
			color: '#fbbf24'
		}
	];
</script>

<svelte:head>
	<title>Practice — Deskriptia</title>
	<meta name="description" content="Latih kemampuan menulis teks deskriptif kamu." />
</svelte:head>

<div class="practice-page">
	<header class="page-header">
		<div>
			<h1 class="page-title">Practice</h1>
			<p class="page-subtitle">Asah kemampuanmu dengan latihan interaktif.</p>
		</div>
	</header>

	<!-- Daily goal -->
	<AppCard variant="elevated" class="daily-card">
		<div class="daily-goal">
			<div class="daily-goal__icon" aria-hidden="true">🎯</div>
			<div class="daily-goal__text">
				<p class="daily-goal__label">Target Hari Ini</p>
				<p class="daily-goal__title">Selesaikan 2 latihan untuk menjaga streak!</p>
			</div>
			<span class="daily-progress">0 / 2</span>
		</div>
	</AppCard>

	<!-- Exercises -->
	<SectionTitle title="Latihan Tersedia" subtitle="Pilih latihan yang sesuai dengan materi yang sedang kamu pelajari." />

	<div class="exercise-grid">
		{#each exercises as ex}
			<AppCard variant="interactive" class="exercise-card">
				<div class="exercise-header">
					<div class="exercise-icon" style:background="color-mix(in srgb, {ex.color} 15%, transparent)" style:color={ex.color} aria-hidden="true">
						<ex.icon size={20} />
					</div>
					<div class="exercise-meta">
						<span class="exercise-type">{ex.type}</span>
						<div class="exercise-info">
							<Clock size={12} aria-hidden="true" />
							<span>{ex.duration}</span>
						</div>
					</div>
					<XPBadge xp={ex.xp} size="sm" />
				</div>
				<h3 class="exercise-title">{ex.title}</h3>
				<p class="exercise-desc">{ex.description}</p>
				<AnimatedButton variant="primary" size="sm" href="/practice/{ex.id}" class="exercise-btn">
					Mulai Latihan
				</AnimatedButton>
			</AppCard>
		{/each}
	</div>
</div>

<style>
	.practice-page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.page-title {
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--text);
		letter-spacing: -0.03em;
		margin: 0 0 0.25rem;
		line-height: 1.2;
	}

	.page-subtitle {
		font-size: 0.9rem;
		color: #718096;
		margin: 0;
	}

	:global(.daily-card) {
		background: linear-gradient(135deg, #fffbeb, #fef3c7) !important;
		border-color: #fde68a !important;
	}

	.daily-goal {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.daily-goal__icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.daily-goal__text {
		flex: 1;
	}

	.daily-goal__label {
		font-size: 0.75rem;
		font-weight: 600;
		color: #92400e;
		margin: 0 0 0.15rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.daily-goal__title {
		font-size: 0.9rem;
		font-weight: 600;
		color: #78350f;
		margin: 0;
	}

	.daily-progress {
		font-size: 1.1rem;
		font-weight: 800;
		color: #d97706;
		flex-shrink: 0;
	}

	.exercise-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.exercise-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.exercise-icon {
		width: 40px;
		height: 40px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.exercise-meta {
		flex: 1;
	}

	.exercise-type {
		font-size: 0.7rem;
		font-weight: 700;
		color: #718096;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		display: block;
		margin-bottom: 0.15rem;
	}

	.exercise-info {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.75rem;
		color: #718096;
	}

	.exercise-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 0.35rem;
	}

	.exercise-desc {
		font-size: 0.825rem;
		color: #718096;
		margin: 0 0 1rem;
		line-height: 1.5;
	}

	:global(.exercise-btn) {
		width: 100%;
	}
</style>
