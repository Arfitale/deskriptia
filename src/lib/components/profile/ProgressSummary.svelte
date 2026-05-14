<script lang="ts">
	import { Map } from '@lucide/svelte';

	let { trackProgress, completedLessons, totalNodes }: { trackProgress: number; completedLessons: number; totalNodes: number } = $props();
</script>

<div class="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6 transition-all hover:border-border hover:shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 250ms;">
	<div class="flex items-center gap-3">
		<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
			<Map size={22} />
		</div>
		<div>
			<h3 class="font-bold text-foreground">Ringkasan Perjalanan</h3>
			<p class="text-xs font-medium text-muted-foreground">Progres belajarmu saat ini</p>
		</div>
	</div>

	<div class="mt-1 text-sm leading-relaxed text-muted-foreground">
		Kamu telah menyelesaikan <strong class="font-semibold text-foreground">{trackProgress}%</strong> dari keseluruhan materi, 
		dengan <strong class="font-semibold text-foreground">{completedLessons}</strong> dari <strong class="font-semibold text-foreground">{totalNodes}</strong> pelajaran selesai. 
		Terus belajar untuk menyelesaikan seluruh materi Teks Deskripsi!
	</div>
</div>
