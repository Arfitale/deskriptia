<script lang="ts">
	import AppCard from '$lib/components/ui/AppCard.svelte';
	import SectionTitle from '$lib/components/ui/SectionTitle.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import XPBadge from '$lib/components/ui/XPBadge.svelte';
	import { Award, BookOpen, PenLine, Flame } from '@lucide/svelte';

	// Placeholder user data
	const user = {
		name: 'Budi Santoso',
		username: '@budi',
		joinedAt: 'April 2026',
		avatar: 'BS',
		xp: 185,
		streak: 7,
		level: 3
	};

	const stats = [
		{ label: 'Total XP', value: '185', icon: Award, color: '#fbbf24' },
		{ label: 'Streak', value: '7 hari', icon: Flame, color: '#f97316' },
		{ label: 'Materi Selesai', value: '2', icon: BookOpen, color: '#9381ff' },
		{ label: 'Latihan', value: '8', icon: PenLine, color: '#6ee7b7' }
	];

	const achievements = [
		{ title: 'Pemula Semangat', description: 'Selesaikan materi pertama', emoji: '🌱', earned: true },
		{ title: 'Penulis Aktif', description: 'Tulis 5 latihan', emoji: '✍️', earned: true },
		{ title: 'Streak 7 Hari', description: 'Belajar 7 hari berturut-turut', emoji: '🔥', earned: true },
		{ title: 'Ahli Struktur', description: 'Selesaikan semua materi', emoji: '🏆', earned: false },
		{ title: 'Master Deskripsi', description: 'Raih 500 XP', emoji: '⭐', earned: false }
	];
</script>

<svelte:head>
	<title>Profile — Deskriptia</title>
	<meta name="description" content="Profil dan pencapaian belajar kamu di Deskriptia." />
</svelte:head>

<div class="profile-page">
	<!-- Profile hero -->
	<AppCard variant="elevated" class="profile-hero">
		<div class="profile-info">
			<div class="avatar" aria-hidden="true">{user.avatar}</div>
			<div class="profile-details">
				<h1 class="profile-name">{user.name}</h1>
				<p class="profile-username">{user.username} · Bergabung {user.joinedAt}</p>
				<div class="profile-badges">
					<XPBadge xp={user.xp} />
					<span class="level-badge">Level {user.level}</span>
				</div>
			</div>
		</div>
		<!-- Level progress -->
		<div class="level-progress">
			<ProgressBar value={user.xp} max={300} showLabel label="Menuju Level {user.level + 1}" color="primary" />
		</div>
	</AppCard>

	<!-- Stats grid -->
	<div class="stats-grid">
		{#each stats as stat}
			<AppCard variant="default" class="stat-card">
				<div class="stat-icon" style:color={stat.color} aria-hidden="true">
					<stat.icon size={20} />
				</div>
				<p class="stat-value">{stat.value}</p>
				<p class="stat-label">{stat.label}</p>
			</AppCard>
		{/each}
	</div>

	<!-- Achievements -->
	<SectionTitle title="Pencapaian" subtitle="Kumpulkan lencana dengan terus belajar." />

	<div class="achievement-grid">
		{#each achievements as badge}
			<AppCard variant="default" class="achievement-card {badge.earned ? '' : 'achievement-card--locked'}">
				<div class="achievement-emoji" aria-hidden="true" class:locked={!badge.earned}>
					{badge.earned ? badge.emoji : '🔒'}
				</div>
				<h3 class="achievement-title">{badge.title}</h3>
				<p class="achievement-desc">{badge.description}</p>
			</AppCard>
		{/each}
	</div>
</div>

<style>
	.profile-page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	:global(.profile-hero) {
		background: linear-gradient(135deg, var(--primary-soft), #fff) !important;
	}

	.profile-info {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-bottom: 1.25rem;
	}

	.avatar {
		width: 64px;
		height: 64px;
		border-radius: 18px;
		background: linear-gradient(135deg, var(--primary), var(--primary-hover));
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		font-weight: 800;
		flex-shrink: 0;
		box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 35%, transparent);
	}

	.profile-name {
		font-size: 1.3rem;
		font-weight: 800;
		color: var(--text);
		margin: 0 0 0.2rem;
		letter-spacing: -0.02em;
	}

	.profile-username {
		font-size: 0.825rem;
		color: #718096;
		margin: 0 0 0.5rem;
	}

	.profile-badges {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.level-badge {
		display: inline-flex;
		align-items: center;
		background: var(--primary);
		color: #fff;
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.15rem 0.55rem;
		border-radius: 99px;
		letter-spacing: 0.02em;
	}

	/* Stats */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
	}

	:global(.stat-card) {
		text-align: center;
		padding: 1rem 0.75rem !important;
	}

	.stat-icon {
		display: flex;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.stat-value {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--text);
		margin: 0 0 0.15rem;
		letter-spacing: -0.02em;
	}

	.stat-label {
		font-size: 0.72rem;
		color: #718096;
		margin: 0;
	}

	/* Achievements */
	.achievement-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 0.75rem;
	}

	:global(.achievement-card) {
		text-align: center;
		padding: 1.25rem 0.875rem !important;
	}

	:global(.achievement-card--locked) {
		opacity: 0.5;
		filter: grayscale(0.5);
	}

	.achievement-emoji {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		display: block;
	}

	.achievement-emoji.locked {
		filter: grayscale(1);
	}

	.achievement-title {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 0.25rem;
	}

	.achievement-desc {
		font-size: 0.72rem;
		color: #718096;
		margin: 0;
		line-height: 1.4;
	}

	/* Responsive */
	@media (max-width: 640px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
