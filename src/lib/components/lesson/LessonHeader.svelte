<script lang="ts">
	import { ArrowLeft, Zap, Clock } from '@lucide/svelte';

	let {
		title,
		chapterLabel,
		chapterNumber,
		xpReward,
		durationMinutes,
		currentStep,
		totalSteps
	}: {
		title: string;
		chapterLabel: string;
		chapterNumber: number;
		xpReward: number;
		durationMinutes: number;
		currentStep: number;
		totalSteps: number;
	} = $props();

	const progressPct = $derived(Math.round((currentStep / totalSteps) * 100));
</script>

<header class="lesson-header">
	<!-- Top row: back + progress bar + xp -->
	<div class="flex items-center gap-3">
		<!-- Back button -->
		<a
			href="/learn"
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-primary hover:text-primary"
			aria-label="Kembali ke track"
		>
			<ArrowLeft size={18} />
		</a>

		<!-- Progress bar -->
		<div class="relative flex-1">
			<div class="h-2.5 w-full overflow-hidden rounded-full bg-muted">
				<div
					class="h-full rounded-full bg-primary transition-all duration-500 ease-out"
					style="width: {progressPct}%"
					role="progressbar"
					aria-valuenow={currentStep}
					aria-valuemin={0}
					aria-valuemax={totalSteps}
					aria-label="Progres pelajaran"
				></div>
			</div>
		</div>

		<!-- XP badge -->
		<span
			class="flex shrink-0 items-center gap-1 rounded-full border border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100 px-2.5 py-1 text-xs font-bold text-amber-600"
		>
			<Zap size={12} />
			+{xpReward} XP
		</span>
	</div>

	<!-- Meta info -->
	<div class="mt-3 flex flex-wrap items-center gap-2">
		<span
			class="rounded-full bg-primary-soft px-2.5 py-0.5 text-[0.68rem] font-bold tracking-wide text-primary uppercase"
		>
			{chapterLabel}
		</span>
		<span class="text-sm font-semibold text-foreground">{title}</span>
		<span class="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
			<Clock size={11} />
			{durationMinutes} mnt
		</span>
	</div>
</header>

<style>
	.lesson-header {
		position: sticky;
		top: 0;
		z-index: 20;
		padding: 1rem 1.25rem 0.875rem;
		background: color-mix(in srgb, var(--bg) 92%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border);
	}
</style>
