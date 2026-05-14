<script lang="ts">
	import { Zap, ArrowRight, Star, RotateCcw, TrendingUp } from '@lucide/svelte';
	import { progressionStore } from '$lib/stores/progressionStore.svelte';

	let {
		lessonTitle,
		xpEarned,
		nextLesson,
		onrestart,
		leveledUp = false
	}: {
		lessonTitle: string;
		xpEarned: number;
		nextLesson?: { id: string; title: string };
		onrestart?: () => void;
		leveledUp?: boolean;
	} = $props();

	// Staggered reveal
	let visible = $state(false);

	$effect(() => {
		const t = setTimeout(() => (visible = true), 80);
		return () => clearTimeout(t);
	});

	const celebrationEmojis = ['🌟', '✨', '💫', '🎊', '🌈'];

	// Derive progression info from store
	const prog = $derived(progressionStore.state);
</script>

<div class="completion-wrapper" class:visible>
	<!-- Floating sparkles -->
	<div class="sparkles" aria-hidden="true">
		{#each celebrationEmojis as emoji, i}
			<span class="sparkle" style="--i: {i}; --delay: {i * 0.12}s;">{emoji}</span>
		{/each}
	</div>

	<div class="completion-card">
		<!-- Trophy icon -->
		<div class="trophy-wrap">
			<div class="trophy-ring"></div>
			<div class="trophy-icon">🎉</div>
		</div>

		<h1 class="completion-title">Pelajaran Selesai!</h1>
		<p class="completion-sub">
			Kamu telah berhasil menyelesaikan <strong>{lessonTitle}</strong>
		</p>

		<!-- XP reward -->
		<div class="xp-badge">
			<Zap size={20} class="xp-icon" />
			<span class="xp-amount">+{xpEarned}</span>
			<span class="xp-label">XP diperoleh</span>
		</div>

		<!-- Level progress bar -->
		<div class="level-section">
			<div class="level-header">
				<span class="level-label">Level {prog.level}</span>
				<span class="level-title">{prog.levelTitle}</span>
			</div>
			<div class="level-bar-track">
				<div
					class="level-bar-fill"
					style:width="{prog.xpProgress.progressPercentage}%"
				></div>
			</div>
			<div class="level-xp-info">
				<span>{prog.totalXP} XP</span>
				<span>{prog.xpProgress.nextLevelXP} XP</span>
			</div>
		</div>

		<!-- Level up celebration -->
		{#if leveledUp}
			<div class="level-up-badge">
				<TrendingUp size={16} />
				<span>Naik ke Level {prog.level}! 🎊</span>
			</div>
		{/if}

		<!-- Stars -->
		<div class="stars" aria-label="Pencapaian bintang">
			{#each [0, 1, 2] as i}
				<Star
					size={28}
					class="star"
					style="--delay: {0.4 + i * 0.12}s"
					fill="#fbbf24"
					color="#f59e0b"
				/>
			{/each}
		</div>

		<!-- CTA buttons -->
		<div class="cta-group">
			{#if nextLesson}
				<a
					href="/lesson/{nextLesson.id}"
					class="btn-next"
				>
					Pelajaran Berikutnya
					<ArrowRight size={16} />
				</a>
			{/if}

			<a href="/learn" class="btn-track">
				Kembali ke Track
			</a>
		</div>

		{#if onrestart}
			<button class="btn-restart" onclick={onrestart}>
				<RotateCcw size={13} />
				Ulangi Pelajaran
			</button>
		{/if}
	</div>
</div>

<style>
	.completion-wrapper {
		padding: 2rem 1.25rem 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		opacity: 0;
		transform: translateY(24px) scale(0.97);
		transition: opacity 0.5s ease, transform 0.5s ease;
	}

	.completion-wrapper.visible {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	/* Floating sparkles */
	.sparkles {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		pointer-events: none;
		overflow: hidden;
	}

	.sparkle {
		position: absolute;
		font-size: 1.2rem;
		animation: floatSparkle 3.5s ease-in-out infinite;
		animation-delay: var(--delay);
		left: calc(10% + var(--i) * 18%);
		top: 10%;
		opacity: 0;
	}

	@keyframes floatSparkle {
		0% { opacity: 0; transform: translateY(0) rotate(0deg); }
		25% { opacity: 0.9; }
		75% { opacity: 0.6; }
		100% { opacity: 0; transform: translateY(-60px) rotate(20deg); }
	}

	/* Card */
	.completion-card {
		background: var(--surface);
		border: 1.5px solid var(--border);
		border-radius: 24px;
		padding: 2.5rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		width: 100%;
		max-width: 480px;
		box-shadow: 0 8px 40px rgba(147, 129, 255, 0.12);
		position: relative;
		z-index: 1;
	}

	/* Trophy */
	.trophy-wrap {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.trophy-ring {
		position: absolute;
		width: 88px;
		height: 88px;
		border-radius: 50%;
		background: linear-gradient(135deg, #f1eeff 0%, #e8e2ff 100%);
		animation: breathe 3s ease-in-out infinite;
	}

	@keyframes breathe {
		0%, 100% { transform: scale(1); opacity: 0.8; }
		50% { transform: scale(1.06); opacity: 1; }
	}

	.trophy-icon {
		position: relative;
		font-size: 3rem;
		animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
	}

	@keyframes pop {
		from { transform: scale(0) rotate(-15deg); opacity: 0; }
		to { transform: scale(1) rotate(0deg); opacity: 1; }
	}

	/* Title */
	.completion-title {
		font-size: 1.6rem;
		font-weight: 900;
		color: var(--foreground);
		margin: 0;
		text-align: center;
		animation: fadeUp 0.4s ease 0.2s both;
	}

	.completion-sub {
		font-size: 0.9rem;
		color: var(--muted-foreground);
		text-align: center;
		margin: 0;
		line-height: 1.6;
		animation: fadeUp 0.4s ease 0.25s both;
	}

	.completion-sub strong {
		color: var(--foreground);
	}

	/* XP badge */
	.xp-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: linear-gradient(135deg, #fef3c7, #fde68a);
		border: 1.5px solid #fcd34d;
		border-radius: 999px;
		padding: 0.625rem 1.5rem;
		animation: fadeUp 0.4s ease 0.3s both;
	}

	:global(.xp-icon) {
		color: #d97706;
	}

	.xp-amount {
		font-size: 1.5rem;
		font-weight: 900;
		color: #b45309;
	}

	.xp-label {
		font-size: 0.8rem;
		font-weight: 600;
		color: #92400e;
	}

	/* Level section */
	.level-section {
		width: 100%;
		max-width: 320px;
		animation: fadeUp 0.4s ease 0.33s both;
	}

	.level-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.level-label {
		font-size: 0.78rem;
		font-weight: 800;
		color: var(--primary);
	}

	.level-title {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--muted-foreground);
	}

	.level-bar-track {
		height: 8px;
		background: var(--muted);
		border-radius: 999px;
		overflow: hidden;
	}

	.level-bar-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--primary), #b3a3ff);
		border-radius: 999px;
		transition: width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
	}

	.level-bar-fill::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
		animation: shimmer 2.5s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		60%, 100% { transform: translateX(200%); }
	}

	.level-xp-info {
		display: flex;
		justify-content: space-between;
		margin-top: 0.35rem;
		font-size: 0.68rem;
		color: var(--muted-foreground);
		font-weight: 500;
	}

	/* Level up badge */
	.level-up-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: linear-gradient(135deg, #f1eeff, #e8e2ff);
		border: 1.5px solid color-mix(in srgb, var(--primary) 30%, transparent);
		border-radius: 999px;
		padding: 0.5rem 1.25rem;
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--primary);
		animation: levelUpPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both;
	}

	@keyframes levelUpPop {
		from { transform: scale(0.5); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}

	/* Stars */
	.stars {
		display: flex;
		gap: 0.5rem;
		animation: fadeUp 0.4s ease 0.35s both;
	}

	:global(.star) {
		animation: starPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay) both;
	}

	@keyframes starPop {
		from { transform: scale(0) rotate(-30deg); opacity: 0; }
		to { transform: scale(1) rotate(0deg); opacity: 1; }
	}

	/* CTA */
	.cta-group {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		width: 100%;
		animation: fadeUp 0.4s ease 0.48s both;
	}

	.btn-next {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background: var(--primary);
		color: white;
		border-radius: 999px;
		padding: 0.875rem 1.5rem;
		font-size: 0.95rem;
		font-weight: 700;
		text-decoration: none;
		transition: all 0.18s ease;
		box-shadow: 0 4px 16px rgba(147, 129, 255, 0.4);
	}

	.btn-next:hover {
		background: var(--primary-hover);
		transform: translateY(-1px);
		box-shadow: 0 6px 20px rgba(147, 129, 255, 0.5);
	}

	.btn-track {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1.5px solid var(--border);
		background: var(--surface);
		color: var(--muted-foreground);
		border-radius: 999px;
		padding: 0.75rem 1.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.18s ease;
	}

	.btn-track:hover {
		border-color: var(--primary);
		color: var(--primary);
	}

	.btn-restart {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: none;
		border: none;
		color: var(--muted-foreground);
		font-size: 0.8rem;
		cursor: pointer;
		padding: 0.25rem 0;
		transition: color 0.15s;
		animation: fadeUp 0.4s ease 0.55s both;
	}

	.btn-restart:hover {
		color: var(--primary);
	}

	@keyframes fadeUp {
		from { opacity: 0; transform: translateY(12px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@media (max-width: 640px) {
		.completion-card {
			padding: 2rem 1.25rem;
		}

		.completion-title {
			font-size: 1.35rem;
		}

		.completion-wrapper {
			padding: 1.5rem 1rem 3rem;
		}
	}
</style>
