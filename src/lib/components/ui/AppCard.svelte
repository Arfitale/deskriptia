<script lang="ts">
	import { type Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type Variant = 'default' | 'elevated' | 'interactive';

	let {
		variant = 'default',
		class: className = '',
		onclick,
		children
	}: {
		variant?: Variant;
		class?: string;
		onclick?: () => void;
		children: Snippet;
	} = $props();

	const variantClasses: Record<Variant, string> = {
		default: 'app-card--default',
		elevated: 'app-card--elevated',
		interactive: 'app-card--interactive'
	};
</script>

{#if onclick}
	<button type="button" class={cn('app-card', variantClasses[variant], className)} {onclick}>
		{@render children()}
	</button>
{:else}
	<div class={cn('app-card', variantClasses[variant], className)}>
		{@render children()}
	</div>
{/if}

<style>
	:global(.app-card) {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 1.25rem;
		text-align: left;
		width: 100%;
		font-family: inherit;
		transition:
			box-shadow 0.2s ease,
			transform 0.18s ease,
			border-color 0.18s ease;
	}

	:global(.app-card--default) {
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
	}

	:global(.app-card--elevated) {
		box-shadow: 0 4px 16px rgba(147, 129, 255, 0.1);
	}

	:global(.app-card--interactive) {
		cursor: pointer;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
	}

	:global(.app-card--interactive:hover) {
		box-shadow: 0 8px 24px rgba(147, 129, 255, 0.15);
		transform: translateY(-2px);
		border-color: color-mix(in srgb, var(--primary) 30%, var(--border));
	}

	:global(.app-card--interactive:active) {
		transform: translateY(0);
		box-shadow: 0 2px 8px rgba(147, 129, 255, 0.1);
	}
</style>
