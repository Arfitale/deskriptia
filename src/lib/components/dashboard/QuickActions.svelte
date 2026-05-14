<script lang="ts">
	import { CirclePlay, Map, PenTool } from '@lucide/svelte';

	let { continueUrl }: { continueUrl: string } = $props();

	const actions = $derived([
		{ label: 'Lanjut', href: continueUrl, icon: CirclePlay, color: 'text-primary' },
		{ label: 'Track', href: '/learn', icon: Map, color: 'text-emerald-500' },
		{ label: 'Latihan', href: '/practice', icon: PenTool, color: 'text-indigo-500' }
	]);
</script>

<div class="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 250ms;">
	{#each actions as action}
		<a 
			href={action.href}
			class="group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-border/50 bg-card py-4 px-2 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-sm sm:gap-3"
		>
			<div class="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 transition-colors group-hover:bg-muted">
				<action.icon size={20} class={action.color} />
			</div>
			<span class="text-[0.7rem] font-bold sm:text-xs uppercase tracking-wider text-muted-foreground">{action.label}</span>
		</a>
	{/each}
</div>
