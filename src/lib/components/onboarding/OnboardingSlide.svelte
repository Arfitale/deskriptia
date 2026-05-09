<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		icon,
		title,
		description,
		active = false
	}: {
		icon: Snippet;
		title: string;
		description: string;
		active?: boolean;
	} = $props();
</script>

<div
	class="flex flex-col items-center gap-6 px-4 text-center"
	class:animate-in={active}
	class:fade-in-0={active}
	class:slide-in-from-right-4={active}
	class:duration-500={active}
>
	<!-- Icon container -->
	<div
		class="flex size-24 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 shadow-inner ring-1 ring-primary/10 md:size-28"
	>
		{@render icon()}
	</div>

	<!-- Text -->
	<div class="flex max-w-sm flex-col gap-2">
		<h2 class="text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
		<p class="text-base leading-relaxed text-muted-foreground">{description}</p>
	</div>
</div>
