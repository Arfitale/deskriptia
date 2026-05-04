<script lang="ts">
	const stats = [
		{ number: '12+', label: 'Topik Materi' },
		{ number: '50+', label: 'Latihan Soal' },
		{ number: 'Gratis', label: 'Untuk Semua' },
	];
</script>

<div class="mt-2 flex flex-wrap items-center justify-center gap-6 md:justify-start">
	{#each stats as stat, i}
		<div class="flex flex-col gap-0.5">
			<span class="text-foreground text-2xl font-extrabold">{stat.number}</span>
			<span class="text-muted-foreground text-xs font-medium">{stat.label}</span>
		</div>

		{#if i < stats.length - 1}
			<div class="bg-border h-9 w-px" aria-hidden="true"></div>
		{/if}
	{/each}
</div>