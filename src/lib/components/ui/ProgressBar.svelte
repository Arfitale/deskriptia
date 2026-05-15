<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		value = 0,
		max = 100,
		showLabel = false,
		label = '',
		color = 'bg-primary',
		class: className = ''
	}: {
		value?: number;
		max?: number;
		showLabel?: boolean;
		label?: string;
		color?: string;
		class?: string;
	} = $props();

	const percentage = $derived(Math.min(100, Math.max(0, (value / max) * 100)));
</script>

<div class={cn("w-full", className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label || 'Progress'}>
	{#if showLabel}
		<div class="mb-1.5 flex items-center justify-between">
			{#if label}
				<span class="text-sm font-medium text-foreground">{label}</span>
			{/if}
			<span class="text-xs font-semibold text-muted-foreground">{Math.round(percentage)}%</span>
		</div>
	{/if}
	<div class="h-2.5 w-full overflow-hidden rounded-full bg-muted">
		<div
			class={cn("relative h-full rounded-full transition-all duration-1000 ease-out", color)}
			style:width="{percentage}%"
		>
			<div class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
		</div>
	</div>
</div>
