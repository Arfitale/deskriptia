<script lang="ts">
	import { cn } from '$lib/utils';

	let { currentStep, totalSteps }: { currentStep: number; totalSteps: number } = $props();
</script>

<div class="flex items-center justify-center gap-2" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
	{#each Array(totalSteps) as _, i}
		<button
			class={cn(
				'h-2 rounded-full transition-all duration-500 ease-out',
				i === currentStep
					? 'w-8 bg-primary shadow-[0_0_8px_rgba(147,129,255,0.4)]'
					: i < currentStep
						? 'w-4 bg-primary/50'
						: 'w-4 bg-muted-foreground/20'
			)}
			aria-label={`Step ${i + 1}`}
			tabindex={-1}
		></button>
	{/each}
</div>
