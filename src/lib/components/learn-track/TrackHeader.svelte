<script lang="ts">
	import { Zap, BookOpen, TrendingUp } from '@lucide/svelte';

	let {
		title,
		subtitle,
		description,
		totalXP,
		earnedXP,
		completedLessons,
		totalLessons
	}: {
		title: string;
		subtitle: string;
		description: string;
		totalXP: number;
		earnedXP: number;
		completedLessons: number;
		totalLessons: number;
	} = $props();

	const xpPercentage = $derived(Math.round((earnedXP / totalXP) * 100));
</script>

<header class="track-header">
	<div class="track-header__bg-orb"></div>
	<div class="track-header__bg-orb track-header__bg-orb--2"></div>

	<div class="track-header__content">
		<div class="track-header__label">
			<TrendingUp size={13} />
			<span>{subtitle}</span>
		</div>

		<h1 class="track-header__title">{title}</h1>
		<p class="track-header__description">{description}</p>

		<div class="track-header__stats">
			<div class="stat-chip stat-chip--lessons">
				<BookOpen size={13} />
				<span>{completedLessons}/{totalLessons} pelajaran</span>
			</div>
			<div class="stat-chip stat-chip--xp">
				<Zap size={13} />
				<span>{earnedXP}/{totalXP} XP</span>
			</div>
			<div class="stat-chip stat-chip--progress">
				<span class="stat-dot"></span>
				<span>{xpPercentage}% selesai</span>
			</div>
		</div>
	</div>

	<div class="track-header__illustration" aria-hidden="true">
		<div class="illustration-ring illustration-ring--outer"></div>
		<div class="illustration-ring illustration-ring--inner"></div>
		<div class="illustration-icon">
			<BookOpen size={28} />
		</div>
	</div>
</header>

<style>
	.track-header {
		position: relative;
		background: linear-gradient(135deg, #6c55d9 0%, #9381ff 50%, #b3a3ff 100%);
		border-radius: 20px;
		padding: 2rem;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		box-shadow:
			0 8px 32px rgba(147, 129, 255, 0.3),
			0 2px 8px rgba(147, 129, 255, 0.15);
	}

	.track-header__bg-orb {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.07);
		pointer-events: none;
	}

	.track-header__bg-orb {
		width: 200px;
		height: 200px;
		top: -60px;
		right: 80px;
	}

	.track-header__bg-orb--2 {
		width: 120px;
		height: 120px;
		bottom: -40px;
		left: 40%;
		background: rgba(255, 255, 255, 0.05);
	}

	.track-header__content {
		position: relative;
		z-index: 1;
		flex: 1;
	}

	.track-header__label {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: rgba(255, 255, 255, 0.18);
		color: rgba(255, 255, 255, 0.92);
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-radius: 99px;
		padding: 0.25rem 0.7rem;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		margin-bottom: 0.75rem;
	}

	.track-header__title {
		font-size: 1.5rem;
		font-weight: 800;
		color: #fff;
		margin: 0 0 0.5rem;
		letter-spacing: -0.03em;
		line-height: 1.2;
	}

	.track-header__description {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 1.25rem;
		line-height: 1.55;
		max-width: 440px;
	}

	.track-header__stats {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.stat-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 99px;
		padding: 0.3rem 0.75rem;
		font-size: 0.78rem;
		font-weight: 600;
		color: #fff;
	}

	.stat-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #6ee7b7;
		box-shadow: 0 0 6px rgba(110, 231, 183, 0.7);
		animation: pulse-dot 2s ease-in-out infinite;
	}

	@keyframes pulse-dot {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(0.8);
		}
	}

	/* Illustration */
	.track-header__illustration {
		position: relative;
		flex-shrink: 0;
		width: 88px;
		height: 88px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
	}

	.illustration-ring {
		position: absolute;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.2);
		animation: rotate-ring 12s linear infinite;
	}

	.illustration-ring--outer {
		width: 88px;
		height: 88px;
		animation-direction: normal;
	}

	.illustration-ring--inner {
		width: 64px;
		height: 64px;
		animation-direction: reverse;
		animation-duration: 8s;
	}

	@keyframes rotate-ring {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.illustration-icon {
		width: 52px;
		height: 52px;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	@media (max-width: 560px) {
		.track-header {
			padding: 1.5rem;
		}

		.track-header__title {
			font-size: 1.2rem;
		}

		.track-header__illustration {
			display: none;
		}
	}
</style>
