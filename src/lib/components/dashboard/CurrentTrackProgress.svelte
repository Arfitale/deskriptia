<script lang="ts">
	import { Map, ArrowRight } from '@lucide/svelte';

	let {
		trackProgress,
		completedCount,
		totalNodes
	}: { trackProgress: number; completedCount: number; totalNodes: number } = $props();
</script>

<div class="flex flex-col gap-5 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-border/80 hover:shadow-sm sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 300ms;">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
				<Map size={22} />
			</div>
			<div>
				<h3 class="font-bold text-foreground">Teks Deskripsi Dasar</h3>
				<p class="text-xs font-medium text-muted-foreground">Track Aktif</p>
			</div>
		</div>
		<a href="/learn" class="group flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
			<ArrowRight size={18} class="transition-transform group-hover:translate-x-0.5" />
		</a>
	</div>

	<div class="flex flex-col gap-2 pt-1">
		<div class="flex justify-between text-sm font-semibold">
			<span class="text-muted-foreground">Progres</span>
			<span class="text-primary">{trackProgress}%</span>
		</div>
		<div class="h-2.5 w-full overflow-hidden rounded-full bg-muted/60">
			<div 
				class="relative h-full rounded-full bg-primary transition-all duration-1000 ease-out"
				style:width="{trackProgress}%"
			>
				<div class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
			</div>
		</div>
		<div class="mt-1 text-xs font-medium text-muted-foreground">
			{completedCount} dari {totalNodes} pelajaran selesai
		</div>
	</div>
</div>
