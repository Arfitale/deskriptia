<script lang="ts">
	import AppCard from '$lib/components/ui/AppCard.svelte';
	import SectionTitle from '$lib/components/ui/SectionTitle.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import XPBadge from '$lib/components/ui/XPBadge.svelte';
	import AnimatedButton from '$lib/components/ui/AnimatedButton.svelte';
	import { BookOpen, Lock, CheckCircle, ArrowRight } from '@lucide/svelte';

	// Placeholder learning tracks
	const tracks = [
		{
			id: 1,
			title: 'Pengenalan Teks Deskriptif',
			description: 'Pelajari apa itu teks deskriptif dan tujuan penulisannya.',
			lessons: 5,
			completed: 5,
			xp: 50,
			isLocked: false,
			isDone: true
		},
		{
			id: 2,
			title: 'Struktur Teks Deskriptif',
			description: 'Identifikasi dan tulis bagian identifikasi serta deskripsi.',
			lessons: 6,
			completed: 3,
			xp: 60,
			isLocked: false,
			isDone: false
		},
		{
			id: 3,
			title: 'Ciri Kebahasaan',
			description: 'Frasa nomina, kata sifat, dan kalimat efektif.',
			lessons: 7,
			completed: 0,
			xp: 70,
			isLocked: true,
			isDone: false
		},
		{
			id: 4,
			title: 'Menulis Teks Sendiri',
			description: 'Latihan menulis teks deskriptif lengkap dari nol.',
			lessons: 8,
			completed: 0,
			xp: 100,
			isLocked: true,
			isDone: false
		}
	];
</script>

<svelte:head>
	<title>Learn Track — Deskriptia</title>
	<meta name="description" content="Jalur pembelajaran teks deskriptif Bahasa Indonesia." />
</svelte:head>

<div class="learn-page">
	<header class="page-header">
		<div class="page-header__text">
			<h1 class="page-title">Learn Track</h1>
			<p class="page-subtitle">Ikuti jalur belajar yang terstruktur untuk menguasai teks deskriptif.</p>
		</div>
		<XPBadge xp={110} />
	</header>

	<!-- Overall progress -->
	<AppCard variant="elevated" class="overall-progress-card">
		<div class="overall-progress">
			<div class="overall-progress__info">
				<span class="overall-progress__label">Progres Keseluruhan</span>
				<span class="overall-progress__fraction">2 / {tracks.length} selesai</span>
			</div>
			<ProgressBar value={2} max={tracks.length} />
		</div>
	</AppCard>

	<!-- Track list -->
	<SectionTitle title="Materi Pembelajaran" subtitle="Selesaikan setiap materi secara berurutan." />

	<div class="track-list">
		{#each tracks as track, i}
			<div class="track-item" class:locked={track.isLocked}>
				<!-- Step indicator -->
				<div class="track-step">
					{#if track.isDone}
						<div class="step-icon step-icon--done" aria-label="Selesai">
							<CheckCircle size={18} />
						</div>
					{:else if track.isLocked}
						<div class="step-icon step-icon--locked" aria-label="Terkunci">
							<Lock size={16} />
						</div>
					{:else}
						<div class="step-icon step-icon--active" aria-label="Sedang berjalan">
							<span>{i + 1}</span>
						</div>
					{/if}
					{#if i < tracks.length - 1}
						<div class="step-connector" class:done={track.isDone}></div>
					{/if}
				</div>

				<!-- Card -->
				<AppCard variant={track.isLocked ? 'default' : 'interactive'} class="track-card">
					<div class="track-card__header">
						<div class="track-card__meta">
							<h3 class="track-card__title">{track.title}</h3>
							<p class="track-card__desc">{track.description}</p>
						</div>
						<XPBadge xp={track.xp} size="sm" />
					</div>

					{#if !track.isLocked}
						<div class="track-card__footer">
							<div class="track-card__progress">
								<ProgressBar value={track.completed} max={track.lessons} showLabel label="{track.completed}/{track.lessons} pelajaran" />
							</div>
							<AnimatedButton
								variant={track.isDone ? 'secondary' : 'primary'}
								size="sm"
								href="/learn/{track.id}"
							>
								{track.isDone ? 'Ulangi' : 'Mulai'}
								<ArrowRight size={14} />
							</AnimatedButton>
						</div>
					{:else}
						<p class="track-card__locked-note">
							<Lock size={12} style="display:inline; margin-right: 4px;" />
							Selesaikan materi sebelumnya untuk membuka ini.
						</p>
					{/if}
				</AppCard>
			</div>
		{/each}
	</div>
</div>

<style>
	.learn-page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
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

	:global(.overall-progress-card) {
		background: linear-gradient(135deg, var(--primary-soft), #fff) !important;
	}

	.overall-progress__info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.6rem;
	}

	.overall-progress__label {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text);
	}

	.overall-progress__fraction {
		font-size: 0.8rem;
		color: #718096;
	}

	/* Track list */
	.track-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.track-item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.track-item.locked {
		opacity: 0.6;
	}

	/* Step indicator */
	.track-step {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		padding-top: 0.2rem;
	}

	.step-icon {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.step-icon--done {
		background: var(--success);
		color: #fff;
	}

	.step-icon--active {
		background: var(--primary);
		color: #fff;
		box-shadow: 0 0 0 4px var(--primary-soft);
	}

	.step-icon--locked {
		background: var(--border);
		color: #718096;
	}

	.step-connector {
		width: 2px;
		flex: 1;
		min-height: 24px;
		background: var(--border);
		margin: 4px 0;
	}

	.step-connector.done {
		background: var(--success);
	}

	:global(.track-card) {
		flex: 1;
		margin-bottom: 1rem;
	}

	.track-card__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.track-card__title {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 0.25rem;
	}

	.track-card__desc {
		font-size: 0.825rem;
		color: #718096;
		margin: 0;
		line-height: 1.5;
	}

	.track-card__footer {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.track-card__progress {
		flex: 1;
	}

	.track-card__locked-note {
		font-size: 0.775rem;
		color: #718096;
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
</style>
