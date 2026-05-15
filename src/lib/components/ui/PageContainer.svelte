<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		children,
		class: className = '',
		maxWidth = 'max-w-4xl'
	}: {
		children: Snippet;
		class?: string;
		maxWidth?: 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl' | 'max-w-7xl';
	} = $props();
</script>

<div class={cn("mx-auto flex flex-col gap-8 pb-12 w-full", maxWidth, className)}>
	{@render children()}
</div>
