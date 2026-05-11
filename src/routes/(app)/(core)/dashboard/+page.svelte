<script lang="ts">
	import AppCard from '$lib/components/ui/AppCard.svelte';
	import SectionTitle from '$lib/components/ui/SectionTitle.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import XPBadge from '$lib/components/ui/XPBadge.svelte';
	import AnimatedButton from '$lib/components/ui/AnimatedButton.svelte';
	import { Button } from '$lib/components/ui/button';
	import { BookOpen, PenLine, Lock, ArrowRight, TrendingUp } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Greeting based on time of day
	const hour = new Date().getHours();
	const greeting = hour < 12 ? 'Selamat pagi' : hour < 17 ? 'Selamat siang' : 'Selamat malam';
</script>

<svelte:head>
	<title>Dashboard — Deskriptia</title>
	<meta name="description" content="Dashboard pembelajaran teks deskriptif Deskriptia." />
</svelte:head>

<div class="dashboard">
	<!-- Page header -->
	<header class="dash-header">
		<div>
			<p class="dash-greeting">{greeting} 👋</p>
			<h1 class="dash-title">Halo, {data.userName}!</h1>
			<p class="dash-subtitle">Lanjutkan perjalanan belajarmu hari ini.</p>
		</div>
		<XPBadge xp={185} />
	</header>

	<!-- Quick stats strip -->
	<div class="stats-strip">
		<div class="stat-item">
			<span class="stat-number">7</span>
			<span class="stat-desc">🔥 Hari Streak</span>
		</div>
		<div class="stat-divider" aria-hidden="true"></div>
		<div class="stat-item">
			<span class="stat-number">2</span>
			<span class="stat-desc">📚 Materi Selesai</span>
		</div>
		<div class="stat-divider" aria-hidden="true"></div>
		<div class="stat-item">
			<span class="stat-number">8</span>
			<span class="stat-desc">✍️ Latihan</span>
		</div>
	</div>

	<!-- Materials section -->
	<section aria-labelledby="materials-heading">
		<SectionTitle
			title="Materi Pembelajaran"
			subtitle="Ikuti urutan materi untuk hasil terbaik."
		/>

		<div class="materials-grid">
			{#each data.materials as material}
				<AppCard variant={material.isLocked ? 'default' : 'interactive'} class="material-card {material.isLocked ? 'material-card--locked' : ''}">
					<div class="material-card__header">
						<div class="material-icon" aria-hidden="true">
							{#if material.isLocked}
								<Lock size={18} />
							{:else}
								<BookOpen size={18} />
							{/if}
						</div>
						<span class="material-status" class:status-open={!material.isLocked} class:status-locked={material.isLocked}>
							{material.isLocked ? 'Terkunci' : (material.isQuizPassed ? 'Selesai' : 'Tersedia')}
						</span>
					</div>

					<h2 class="material-title">{material.title}</h2>

					{#if !material.isLocked}
						<div class="material-score">
							<ProgressBar value={material.score} max={100} showLabel label="Skor Quiz" />
						</div>
					{/if}

					<div class="material-actions">
						<a href={material.isLocked ? undefined : `/materi/${material.slug}`} class:pointer-none={material.isLocked}>
							<Button disabled={material.isLocked} size="sm">
								Buka Materi
							</Button>
						</a>
						<form method="POST" action="?/createDraft">
							<input type="hidden" name="materialId" value={material.id} />
							<Button variant="secondary" size="sm" disabled={material.isLocked} type="submit">
								Mulai Latihan
							</Button>
						</form>
					</div>
				</AppCard>
			{/each}
		</div>
	</section>

	<!-- Drafts section -->
	<section aria-labelledby="drafts-heading">
		<SectionTitle title="Draf Kamu" subtitle="Lanjutkan tulisan yang belum selesai." />

		{#if data.drafts.length === 0}
			<AppCard variant="default" class="empty-state">
				<div class="empty-content">
					<span class="empty-icon" aria-hidden="true">📝</span>
					<p class="empty-text">Belum ada draf. Mulai latihan menulis dari materi di atas!</p>
				</div>
			</AppCard>
		{:else}
			<div class="drafts-grid">
				{#each data.drafts as draft}
					<AppCard variant="interactive" class="draft-card">
						<div class="draft-header">
							<PenLine size={16} class="draft-icon" aria-hidden="true" />
							<span class="draft-updated">
								{new Date(draft.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
							</span>
						</div>
						<h3 class="draft-title">{draft.title}</h3>
						<a href={`/latihan-baca/${draft.id}`} class="draft-link">
							<Button variant="secondary" size="sm" class="draft-btn">
								Lanjutkan
								<ArrowRight size={14} />
							</Button>
						</a>
					</AppCard>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	.dashboard {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* Header */
	.dash-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.dash-greeting {
		font-size: 0.85rem;
		color: #718096;
		margin: 0 0 0.15rem;
	}

	.dash-title {
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--text);
		margin: 0 0 0.25rem;
		letter-spacing: -0.03em;
		line-height: 1.2;
	}

	.dash-subtitle {
		font-size: 0.875rem;
		color: #718096;
		margin: 0;
	}

	/* Stats strip */
	.stats-strip {
		display: flex;
		align-items: center;
		gap: 0;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 1rem 1.5rem;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
	}

	.stat-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}

	.stat-number {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--text);
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.stat-desc {
		font-size: 0.75rem;
		color: #718096;
		text-align: center;
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: var(--border);
		flex-shrink: 0;
	}

	/* Materials grid */
	.materials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1rem;
	}

	:global(.material-card) {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	:global(.material-card--locked) {
		opacity: 0.65;
	}

	.material-card__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.material-icon {
		width: 34px;
		height: 34px;
		border-radius: 10px;
		background: var(--primary-soft);
		color: var(--primary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.material-status {
		font-size: 0.72rem;
		font-weight: 600;
		padding: 0.2rem 0.6rem;
		border-radius: 99px;
	}

	.status-open {
		background: color-mix(in srgb, var(--success) 15%, transparent);
		color: #065f46;
	}

	.status-locked {
		background: color-mix(in srgb, #718096 12%, transparent);
		color: #718096;
	}

	.material-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--text);
		margin: 0;
		line-height: 1.4;
	}

	.material-score {
		margin-top: 0.25rem;
	}

	.material-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-top: auto;
	}

	.pointer-none {
		pointer-events: none;
	}

	/* Drafts */
	.drafts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1rem;
	}

	:global(.draft-card) {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.draft-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	:global(.draft-icon) {
		color: var(--primary);
	}

	.draft-updated {
		font-size: 0.72rem;
		color: #718096;
	}

	.draft-title {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text);
		margin: 0;
		flex: 1;
	}

	:global(.draft-btn) {
		width: 100%;
		justify-content: center;
	}

	.draft-link {
		margin-top: auto;
	}

	/* Empty state */
	:global(.empty-state) {
		text-align: center;
	}

	.empty-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 1.5rem 1rem;
	}

	.empty-icon {
		font-size: 2.5rem;
	}

	.empty-text {
		font-size: 0.875rem;
		color: #718096;
		margin: 0;
		max-width: 280px;
		line-height: 1.5;
	}
</style>
