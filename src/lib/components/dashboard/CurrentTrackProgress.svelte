<script lang="ts">
	import { Map, ArrowRight } from '@lucide/svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import AppCard from '$lib/components/ui/AppCard.svelte';

	let {
		trackProgress,
		completedCount,
		totalNodes
	}: { trackProgress: number; completedCount: number; totalNodes: number } = $props();
</script>

<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 300ms;">
	<AppCard class="flex flex-col gap-5 sm:p-6 border-border/60 hover:border-border/80">
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
			<ProgressBar 
				value={trackProgress} 
				max={100} 
				showLabel={true} 
				label="Progres"
				class="[&_.text-sm]:font-semibold [&_.text-sm]:text-muted-foreground [&_.text-xs]:text-primary"
			/>
			<div class="mt-1 text-xs font-medium text-muted-foreground">
				{completedCount} dari {totalNodes} pelajaran selesai
			</div>
		</div>
	</AppCard>
</div>
