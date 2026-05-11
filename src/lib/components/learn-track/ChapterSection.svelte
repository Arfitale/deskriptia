<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		babLabel,
		title,
		description,
		nodeCount,
		completedCount,
		children
	}: {
		babLabel: string;
		title: string;
		description?: string;
		nodeCount: number;
		completedCount: number;
		children: Snippet;
	} = $props();

	const allDone = $derived(completedCount === nodeCount);
	const progress = $derived(Math.round((completedCount / nodeCount) * 100));
</script>

<section class="flex flex-col">
	<div class="mb-2.5 flex items-start justify-between gap-4">
		<div class="flex-1">
			<div
				class="mb-1.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-bold tracking-widest uppercase"
				class:text-[var(--primary)]={!allDone}
				class:bg-[color-mix(in_srgb,var(--primary)_10%,transparent)]={!allDone}
				class:border-[color-mix(in_srgb,var(--primary)_20%,transparent)]={!allDone}
				class:text-[var(--success)]={allDone}
				class:bg-[color-mix(in_srgb,var(--success)_10%,transparent)]={allDone}
				class:border-[color-mix(in_srgb,var(--success)_25%,transparent)]={allDone}
			>
				{#if allDone}
					<span class="text-[0.65rem]" aria-hidden="true">✓</span>
				{/if}
				{babLabel}
			</div>

			<div class="mb-1 flex items-center gap-2.5">
				<h2 class="m-0 text-[1.1rem] leading-tight font-extrabold tracking-tight text-foreground">
					{title}
				</h2>
				<span
					class="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[0.72rem] font-semibold text-muted-foreground"
				>
					{completedCount}/{nodeCount}
				</span>
			</div>

			{#if description}
				<p class="m-0 text-[0.82rem] leading-relaxed text-muted-foreground">
					{description}
				</p>
			{/if}
		</div>
	</div>

	<!-- Thin chapter progress bar -->
	<div class="mb-5 h-[3px] overflow-hidden rounded-full bg-border" aria-hidden="true">
		<div
			class="h-full rounded-full bg-linear-to-r from-primary to-[#b3a3ff] transition-[width] duration-600 ease-in-out"
			style:width="{progress}%"
		></div>
	</div>

	<div class="flex flex-col">
		{@render children()}
	</div>
</section>
