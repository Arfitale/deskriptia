<script lang="ts">
	import { CircleCheck, Trophy, Flame, Zap } from '@lucide/svelte';

	let {
		completedLessons,
		completedChapters,
		totalXP,
		streak = 1
	}: {
		completedLessons: number;
		completedChapters: number;
		totalXP: number;
		streak?: number;
	} = $props();

	const stats = $derived([
		{ label: 'Pelajaran Selesai', value: completedLessons, icon: CircleCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
		{ label: 'Bab Selesai', value: completedChapters, icon: Trophy, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
		{ label: 'Hari Aktif', value: streak, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
		{ label: 'Total XP', value: totalXP, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' }
	]);
</script>

<div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 150ms;">
	{#each stats as stat}
		<div class="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card p-5 text-center transition-all duration-300 hover:border-border hover:shadow-sm">
			<div class="flex h-12 w-12 items-center justify-center rounded-full {stat.bg}">
				<stat.icon size={24} class={stat.color} />
			</div>
			<div class="mt-2 text-2xl font-extrabold tracking-tight text-foreground">{stat.value}</div>
			<div class="text-xs font-medium text-muted-foreground">{stat.label}</div>
		</div>
	{/each}
</div>
