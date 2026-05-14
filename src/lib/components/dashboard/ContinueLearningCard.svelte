<script lang="ts">
	import { Play, Clock, Zap, ArrowRight, BookOpen } from '@lucide/svelte';
	
	let {
		currentNodeId,
		chapterTitle,
		title,
		duration,
		xp,
		progressPercentage,
	}: {
		currentNodeId: string;
		chapterTitle: string;
		title: string;
		duration: number;
		xp: number;
		progressPercentage: number;
	} = $props();
</script>

<div class="group relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-background to-muted/30 p-px transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 animate-in fade-in zoom-in-95 ease-out fill-mode-both" style="animation-delay: 100ms;">
	<div class="absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"></div>
	
	<div class="relative flex flex-col gap-6 rounded-[1.4rem] bg-background/80 p-6 backdrop-blur-xl sm:p-8">
		<div class="flex items-center justify-between">
			<div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
				<BookOpen size={14} />
				<span>{chapterTitle}</span>
			</div>
			<div class="text-sm font-bold text-muted-foreground">{progressPercentage}% selesai</div>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="text-2xl font-extrabold tracking-tight text-foreground sm:text-[1.75rem] leading-tight">
				{title}
			</h2>
			<div class="flex flex-wrap items-center gap-4 mt-1 text-sm font-medium text-muted-foreground">
				<span class="flex items-center gap-1.5">
					<Clock size={16} class="text-primary/70" />
					{duration} mnt
				</span>
				<span class="flex items-center gap-1.5 text-amber-600 dark:text-amber-500">
					<Zap size={16} />
					+{xp} XP
				</span>
			</div>
		</div>

		<div class="mt-4">
			<a
				href={`/lesson/${currentNodeId}`}
				class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
			>
				<Play size={18} class="fill-current" />
				Lanjutkan Belajar
				<ArrowRight size={18} class="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
			</a>
		</div>
		
		<!-- subtle decorative element -->
		<div class="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-primary/10 blur-[3rem] transition-all duration-700 group-hover:bg-primary/15 group-hover:blur-[4rem]"></div>
	</div>
</div>
