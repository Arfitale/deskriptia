<script lang="ts">
	import { CircleCheck, Trophy, Flame, Zap } from '@lucide/svelte';
	import StatCard from '$lib/components/ui/StatCard.svelte';

	let {
		completedLessons,
		completedChapters,
		totalXP,
		streak = 0
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
		<StatCard
			label={stat.label}
			value={stat.value}
			icon={stat.icon}
			colorClass={stat.color}
			bgClass={stat.bg}
			align="center"
		/>
	{/each}
</div>
