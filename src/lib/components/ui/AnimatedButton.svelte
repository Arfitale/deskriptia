<script lang="ts">
	import { type Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type Variant = 'primary' | 'secondary' | 'ghost';
	type Size = 'sm' | 'md' | 'lg';

	let {
		variant = 'primary',
		size = 'md',
		href,
		disabled = false,
		type = 'button',
		class: className = '',
		onclick,
		children
	}: {
		variant?: Variant;
		size?: Size;
		href?: string;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		onclick?: () => void;
		children: Snippet;
	} = $props();

	const base =
		'animated-btn inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary select-none';

	const variants: Record<Variant, string> = {
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		ghost: 'btn-ghost'
	};

	const sizes: Record<Size, string> = {
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg'
	};
</script>

{#if href && !disabled}
	<a
		{href}
		class={cn(base, variants[variant], sizes[size], className)}
		role="button"
	>
		{@render children()}
	</a>
{:else}
	<button
		{type}
		{disabled}
		class={cn(base, variants[variant], sizes[size], { 'opacity-50 cursor-not-allowed': disabled }, className)}
		{onclick}
	>
		{@render children()}
	</button>
{/if}

<style>
	:global(.animated-btn) {
		cursor: pointer;
		gap: 0.5rem;
		white-space: nowrap;
		letter-spacing: -0.01em;
	}

	/* Sizes */
	:global(.btn-sm) {
		padding: 0.4rem 0.875rem;
		font-size: 0.8rem;
		gap: 0.35rem;
	}
	:global(.btn-md) {
		padding: 0.6rem 1.25rem;
		font-size: 0.9rem;
	}
	:global(.btn-lg) {
		padding: 0.8rem 1.75rem;
		font-size: 1rem;
	}

	/* Primary */
	:global(.btn-primary) {
		background: var(--primary);
		color: #fff;
		box-shadow: 0 2px 8px color-mix(in srgb, var(--primary) 35%, transparent);
	}
	:global(.btn-primary:hover:not(:disabled)) {
		background: var(--primary-hover);
		box-shadow: 0 4px 16px color-mix(in srgb, var(--primary) 45%, transparent);
		transform: translateY(-1px);
	}
	:global(.btn-primary:active:not(:disabled)) {
		transform: translateY(0);
		box-shadow: 0 2px 6px color-mix(in srgb, var(--primary) 25%, transparent);
	}

	/* Secondary */
	:global(.btn-secondary) {
		background: var(--primary-soft);
		color: var(--primary);
		border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
	}
	:global(.btn-secondary:hover:not(:disabled)) {
		background: color-mix(in srgb, var(--primary-soft) 80%, var(--primary) 20%);
		transform: translateY(-1px);
	}
	:global(.btn-secondary:active:not(:disabled)) {
		transform: translateY(0);
	}

	/* Ghost */
	:global(.btn-ghost) {
		background: transparent;
		color: var(--text);
		border: 1px solid var(--border);
	}
	:global(.btn-ghost:hover:not(:disabled)) {
		background: var(--primary-soft);
		color: var(--primary);
		border-color: color-mix(in srgb, var(--primary) 25%, transparent);
		transform: translateY(-1px);
	}
	:global(.btn-ghost:active:not(:disabled)) {
		transform: translateY(0);
	}
</style>
