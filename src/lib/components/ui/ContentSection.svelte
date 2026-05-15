<script lang="ts">
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		title,
		subtitle,
		children,
		class: className = '',
		ariaLabel
	}: {
		title?: string;
		subtitle?: string;
		children: Snippet;
		class?: string;
		ariaLabel?: string;
	} = $props();
</script>

<section aria-label={ariaLabel || title} class={cn("flex flex-col", className)}>
	{#if title}
		<SectionHeader {title} {subtitle} />
	{/if}
	{@render children()}
</section>
