<script lang="ts">
	import { onMount } from 'svelte';

	let {
		completed,
		total,
		earnedXP,
		totalXP
	}: {
		completed: number;
		total: number;
		earnedXP: number;
		totalXP: number;
	} = $props();

	const percentage = $derived(Math.min(100, Math.round((completed / total) * 100)));

	let mounted = $state(false);
	onMount(() => {
		// small delay so the transition plays visibly on mount
		setTimeout(() => {
			mounted = true;
		}, 100);
	});
</script>

<div class="progress-summary">
	<div class="progress-summary__header">
		<div class="progress-summary__left">
			<span class="progress-summary__title">Progres Keseluruhan</span>
			<span class="progress-summary__fraction"
				><strong>{completed}</strong> / {total} pelajaran selesai</span
			>
		</div>
		<div class="progress-summary__percentage-badge" aria-label="{percentage}% selesai">
			{percentage}%
		</div>
	</div>

	<div class="progress-bar-track" role="progressbar" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={total} aria-label="Progres belajar">
		<div
			class="progress-bar-fill"
			style:width={mounted ? `${percentage}%` : '0%'}
		>
			<div class="progress-bar-glow"></div>
		</div>
	</div>

	<div class="progress-summary__footer">
		<div class="xp-mini">
			<span class="xp-mini__earned">{earnedXP} XP</span>
			<span class="xp-mini__sep">·</span>
			<span class="xp-mini__total">{totalXP} XP total</span>
		</div>
		<div class="lesson-chips">
			{#each Array(Math.min(total, 15)) as _, i}
				<div
					class="lesson-pip"
					class:lesson-pip--done={i < completed}
					class:lesson-pip--current={i === completed}
					aria-hidden="true"
				></div>
			{/each}
			{#if total > 15}
				<span class="lesson-pip-more">+{total - 15}</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.progress-summary {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 1.25rem 1.5rem;
		box-shadow: 0 4px 16px rgba(147, 129, 255, 0.07);
	}

	.progress-summary__header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.85rem;
	}

	.progress-summary__left {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.progress-summary__title {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--muted-foreground);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.progress-summary__fraction {
		font-size: 1rem;
		color: var(--foreground);
		font-weight: 400;
	}

	.progress-summary__fraction strong {
		font-weight: 800;
		color: var(--primary);
	}

	.progress-summary__percentage-badge {
		font-size: 1.4rem;
		font-weight: 800;
		color: var(--primary);
		letter-spacing: -0.04em;
		line-height: 1;
		flex-shrink: 0;
	}

	/* Bar */
	.progress-bar-track {
		height: 10px;
		background: var(--muted);
		border-radius: 99px;
		overflow: hidden;
		margin-bottom: 0.85rem;
	}

	.progress-bar-fill {
		height: 100%;
		border-radius: 99px;
		background: linear-gradient(90deg, var(--primary), #b3a3ff);
		transition: width 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;
	}

	.progress-bar-glow {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.35) 50%,
			transparent 100%
		);
		animation: shimmer 2.5s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		60%,
		100% {
			transform: translateX(200%);
		}
	}

	/* Footer */
	.progress-summary__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.xp-mini {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.78rem;
	}

	.xp-mini__earned {
		font-weight: 700;
		color: #d97706;
		background: linear-gradient(135deg, #fef3c7, #fde68a);
		border: 1px solid #fbbf24;
		border-radius: 99px;
		padding: 0.15rem 0.6rem;
	}

	.xp-mini__sep {
		color: var(--muted-foreground);
	}

	.xp-mini__total {
		color: var(--muted-foreground);
	}

	.lesson-chips {
		display: flex;
		align-items: center;
		gap: 3px;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.lesson-pip {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--border);
		transition:
			background 0.3s ease,
			transform 0.2s ease;
	}

	.lesson-pip--done {
		background: var(--primary);
	}

	.lesson-pip--current {
		background: var(--primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
		transform: scale(1.3);
	}

	.lesson-pip-more {
		font-size: 0.7rem;
		color: var(--muted-foreground);
		margin-left: 2px;
	}

	@media (max-width: 500px) {
		.lesson-chips {
			display: none;
		}
	}
</style>
