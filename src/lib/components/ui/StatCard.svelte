<script lang="ts">
	import type { Component} from 'svelte';
	import { cn } from '$lib/utils';

	let {
		label,
		value,
		icon: Icon,
		colorClass = 'text-primary',
		bgClass = 'bg-primary/10',
		align = 'left',
		class: className = ''
	}: {
		label: string;
		value: string | number;
		icon: Component;
		colorClass?: string;
		bgClass?: string;
		align?: 'left' | 'center';
		class?: string;
	} = $props();
</script>

<div class={cn(
	"flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-4 transition-all duration-300 hover:border-border hover:shadow-sm hover:-translate-y-0.5",
	align === 'center' ? 'items-center text-center' : '',
	className
)}>
	<div class={cn(
		"flex items-center justify-center",
		align === 'center' ? 'h-12 w-12 rounded-full' : 'h-10 w-10 rounded-xl',
		bgClass
	)}>
		<Icon size={align === 'center' ? 24 : 20} class={colorClass} />
	</div>
	<div class={align === 'center' ? 'mt-1' : ''}>
		<div class={cn("font-bold tracking-tight text-foreground", align === 'center' ? 'text-2xl font-extrabold' : 'text-2xl')}>{value}</div>
		<div class="text-xs font-medium text-muted-foreground">{label}</div>
	</div>
</div>
