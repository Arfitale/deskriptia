<script lang="ts">
	import { Zap } from '@lucide/svelte';

	let {
		xp,
		size = 'md'
	}: {
		xp: number;
		size?: 'sm' | 'md';
	} = $props();
</script>

<span class="xp-badge xp-badge--{size}" aria-label="{xp} XP">
	<Zap size={size === 'sm' ? 10 : 12} class="xp-icon" aria-hidden="true" />
	<span>{xp} XP</span>
</span>

<style>
	.xp-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		background: linear-gradient(135deg, #fef3c7, #fde68a);
		color: #92400e;
		border: 1px solid #fbbf24;
		border-radius: 99px;
		font-weight: 700;
		letter-spacing: 0.01em;
		flex-shrink: 0;
	}

	.xp-badge--sm {
		font-size: 0.65rem;
		padding: 0.1rem 0.5rem;
	}

	.xp-badge--md {
		font-size: 0.75rem;
		padding: 0.2rem 0.65rem;
	}

	:global(.xp-icon) {
		color: #d97706;
		flex-shrink: 0;
	}
</style>
