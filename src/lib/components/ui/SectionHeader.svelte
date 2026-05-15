<script lang="ts">
	let {
		title,
		subtitle = '',
		class: className = ''
	}: {
		title: string;
		subtitle?: string;
		class?: string;
	} = $props();

	import { cn } from '$lib/utils';
</script>

<div class={cn("mb-5", className)}>
	<h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-foreground">{title}</h2>
	{#if subtitle}
		<p class="text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
	{/if}
</div>
