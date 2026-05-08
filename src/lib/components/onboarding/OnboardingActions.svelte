<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft, ArrowRight, SkipForward } from '@lucide/svelte';

	let {
		currentStep,
		totalSteps,
		onNext,
		onPrev,
		onSkip
	}: {
		currentStep: number;
		totalSteps: number;
		onNext: () => void;
		onPrev: () => void;
		onSkip: () => void;
	} = $props();

	let isFirst = $derived(currentStep === 0);
	let isLast = $derived(currentStep === totalSteps - 1);
</script>

<div class="flex w-full items-center justify-between gap-3">
	<!-- Left: Back button -->
	<div class="min-w-[100px]">
		{#if !isFirst}
			<Button
				variant="ghost"
				onclick={onPrev}
				class="gap-1.5 text-muted-foreground hover:text-foreground"
			>
				<ArrowLeft class="size-4" />
				Kembali
			</Button>
		{/if}
	</div>

	{#if !isLast}
		<!-- Center: Skip -->
		<Button
			variant="ghost"
			onclick={onSkip}
			class="gap-1.5 text-xs text-muted-foreground/70 hover:text-muted-foreground"
		>
			<SkipForward class="size-3.5" />
			Lewati
		</Button>
	{/if}

	<!-- Right: Next / Finish -->
	<div class="min-w-[100px] text-right">
		<Button
			onclick={onNext}
			class="gap-1.5 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-[0_4px_16px_rgba(147,129,255,0.3)] transition-transform hover:-translate-y-px hover:bg-[var(--primary-hover)]"
		>
			{isLast ? 'Mulai Perjalanan' : 'Lanjut'}
			{#if !isLast}
				<ArrowRight class="size-4" />
			{/if}
		</Button>
	</div>
</div>
