<script lang="ts">
	const stats = [
		{ number: '12+', label: 'Topik Materi' },
		{ number: '50+', label: 'Latihan Soal' },
		{ number: 'Gratis', label: 'Untuk Semua' }
	];
</script>

<div class="mt-2 flex flex-wrap items-center justify-center gap-6 md:justify-start">
	{#each stats as stat, i (i)}
		<div class="flex flex-col gap-0.5">
			<span class="text-2xl font-extrabold text-foreground">{stat.number}</span>
			<span class="text-xs font-medium text-muted-foreground">{stat.label}</span>
		</div>

		{#if i < stats.length - 1}
			<div class="h-9 w-px bg-border" aria-hidden="true"></div>
		{/if}
	{/each}
</div>
