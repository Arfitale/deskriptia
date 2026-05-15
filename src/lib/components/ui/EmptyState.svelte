<script lang="ts">
	import type { Component } from 'svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		icon: Icon,
		title,
		description,
		action,
		variant = 'default',
		class: className = ''
	}: {
		icon?: Component;
		title: string;
		description?: string;
		action?: Snippet;
		variant?: 'default' | 'card';
		class?: string;
	} = $props();

	const isCard = $derived(variant === 'card');
</script>

<div class={cn(
	"flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500 ease-out",
	isCard ? "rounded-3xl border border-border/60 bg-card p-8" : "py-8",
	className
)}>
	{#if Icon}
		<div class={cn("mb-4 flex items-center justify-center rounded-full bg-muted", isCard ? "h-16 w-16" : "h-12 w-12")}>
			<Icon size={isCard ? 32 : 24} class="text-muted-foreground opacity-60" />
		</div>
	{/if}
	
	<h3 class={cn("font-bold text-foreground", isCard ? "text-xl" : "text-base")}>
		{title}
	</h3>
	
	{#if description}
		<p class={cn("mt-2 text-muted-foreground", isCard ? "text-base" : "text-sm")}>
			{description}
		</p>
	{/if}

	{#if action}
		<div class="mt-6">
			{@render action()}
		</div>
	{/if}
</div>
