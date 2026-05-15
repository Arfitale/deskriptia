<script lang="ts">
	import { Zap, CircleCheck, Flame, Trophy } from '@lucide/svelte';
	import StatCard from '$lib/components/ui/StatCard.svelte';

	let {
		totalXP,
		completedCount,
		streak = 1,
		completedChapters = 0
	}: { totalXP: number; completedCount: number; streak?: number; completedChapters?: number } = $props();

	const stats = $derived([
		{ label: 'Total XP', value: totalXP, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
		{ label: 'Pelajaran Selesai', value: completedCount, icon: CircleCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
		{ label: 'Hari Beruntun', value: streak, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
		{ label: 'Bab Selesai', value: completedChapters, icon: Trophy, color: 'text-indigo-500', bg: 'bg-indigo-500/10' }
	]);
</script>

<div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 200ms;">
	{#each stats as stat}
		<StatCard 
			label={stat.label}
			value={stat.value}
			icon={stat.icon}
			colorClass={stat.color}
			bgClass={stat.bg}
		/>
	{/each}
</div>
