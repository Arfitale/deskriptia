<script lang="ts">
	let { completedLessons, totalXP, completedChapters }: { completedLessons: number; totalXP: number; completedChapters: number } = $props();

	const achievements = $derived([
		{ title: 'Langkah Pertama', description: 'Selesaikan 1 pelajaran', icon: '🌱', unlocked: completedLessons >= 1 },
		{ title: 'Pelajar Rajin', description: 'Selesaikan 5 pelajaran', icon: '📚', unlocked: completedLessons >= 5 },
		{ title: 'Pengejar XP', description: 'Kumpulkan 100 XP', icon: '⚡', unlocked: totalXP >= 100 },
		{ title: 'Ahli Struktur', description: 'Selesaikan Bab 1', icon: '🏆', unlocked: completedChapters >= 1 },
		{ title: 'Master Deskripsi', description: 'Selesaikan semua materi', icon: '👑', unlocked: completedChapters >= 3 }
	]);
</script>

<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 200ms;">
	{#each achievements as achievement}
		<div class="flex flex-col items-center justify-between gap-3 rounded-2xl border {achievement.unlocked ? 'border-primary/20 bg-primary/5 shadow-xs shadow-primary/5' : 'border-border/40 bg-muted/30 opacity-70'} p-4 text-center transition-all duration-300 hover:opacity-100 h-full">
			<div class="text-3xl transition-transform duration-300 {achievement.unlocked ? 'drop-shadow-md hover:scale-110' : 'grayscale'}">
				{achievement.icon}
			</div>
			<div class="flex-1 flex flex-col justify-center">
				<h4 class="text-xs font-bold text-foreground">{achievement.title}</h4>
				<p class="mt-1 text-[0.65rem] leading-tight text-muted-foreground">{achievement.description}</p>
			</div>
			{#if achievement.unlocked}
				<div class="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-primary">
					Terbuka
				</div>
			{:else}
				<div class="mt-2 inline-flex rounded-full bg-muted px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-muted-foreground">
					Terkunci
				</div>
			{/if}
		</div>
	{/each}
</div>
