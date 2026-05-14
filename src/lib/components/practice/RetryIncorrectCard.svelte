<script lang="ts">
	import { RotateCcw } from '@lucide/svelte';

	let { incorrectCount }: { incorrectCount: number } = $props();
</script>

<div class="group relative overflow-hidden rounded-3xl border border-rose-200/50 bg-linear-to-br from-rose-50/50 to-transparent dark:border-rose-900/30 dark:from-rose-900/10 p-5 transition-all duration-300 hover:shadow-lg hover:border-rose-300/50 dark:hover:border-rose-800/50 animate-in fade-in slide-in-from-bottom-4 ease-out fill-mode-both" style="animation-delay: 250ms;">
	<div class="relative flex items-center justify-between gap-6 sm:gap-4">
		<div class="flex items-center gap-4">
			<div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 transition-transform group-hover:scale-105">
				<RotateCcw size={28} />
			</div>
			<div>
				<h3 class="text-lg font-bold text-foreground">Ulas Kesalahan</h3>
				<p class="text-sm text-muted-foreground">Tinjau {incorrectCount} soal yang masih salah</p>
			</div>
		</div>
		
		<a href="/practice/retry" class="flex shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 px-4 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 hover:bg-rose-500/20">
			Ulangi
		</a>
	</div>
</div>
