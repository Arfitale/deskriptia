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
		default: 'shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
		elevated: 'shadow-[0_4px_16px_rgba(147,129,255,0.1)]',
		interactive: 'cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(147,129,255,0.15)] hover:-translate-y-0.5 hover:border-primary/30 active:translate-y-0 active:shadow-[0_2px_8px_rgba(147,129,255,0.1)]'
	};
</script>

{#if onclick}
	<button 
		type="button" 
		class={cn(
			'w-full rounded-2xl border border-border bg-card p-5 text-left font-sans transition-all duration-200', 
			variantClasses[variant], 
			className
		)} 
		{onclick}
	>
		{@render children()}
	</button>
{:else}
	<div 
		class={cn(
			'w-full rounded-2xl border border-border bg-card p-5 text-left font-sans transition-all duration-200', 
			variantClasses[variant], 
			className
		)}
	>
		{@render children()}
	</div>
{/if}
