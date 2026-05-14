<script lang="ts">
	import { Trophy } from '@lucide/svelte';

	let { title, description }: { title: string; description: string } = $props();
</script>

<div class="flex items-center gap-4 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 bg-linear-to-r from-amber-50/50 to-transparent dark:from-amber-900/10 p-4 transition-all hover:border-amber-300/50 dark:hover:border-amber-800/50 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 250ms;">
	<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
		<Trophy size={24} class="text-amber-500" />
	</div>
	<div class="flex flex-col">
		<span class="text-[0.65rem] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500">Pencapaian Baru</span>
		<span class="font-bold text-foreground text-sm">{title}</span>
		<span class="text-xs text-muted-foreground mt-0.5">{description}</span>
	</div>
</div>
