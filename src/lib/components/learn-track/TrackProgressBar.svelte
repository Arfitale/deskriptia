<script lang="ts">
	import { onMount } from 'svelte';

	let {
		completed,
		total,
		earnedXP,
		totalXP
	}: {
		completed: number;
		total: number;
		earnedXP: number;
		totalXP: number;
	} = $props();

	const percentage = $derived(Math.min(100, Math.round((completed / total) * 100)));

	let mounted = $state(false);
	onMount(() => {
		// small delay so the transition plays visibly on mount
		setTimeout(() => {
			mounted = true;
		}, 100);
	});
</script>

<!-- progress-summary -->
<div
	class="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out rounded-2xl border border-border bg-(--surface) px-6 py-5 shadow-[0_4px_16px_rgba(147,129,255,0.07)]"
>
	<!-- header -->
	<div class="mb-3.5 flex items-start justify-between gap-4">
		<!-- left -->
		<div class="flex flex-col gap-1">
			<!-- title -->
			<span class="text-[0.82rem] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
				Progres Keseluruhan
			</span>
			<!-- fraction -->
			<span class="text-base font-normal text-foreground">
				<strong class="font-extrabold text-primary">{completed}</strong> / {total} pelajaran selesai
			</span>
		</div>
		<!-- percentage-badge -->
		<div
			class="shrink-0 text-[1.4rem] leading-none font-extrabold tracking-[-0.04em] text-primary"
			aria-label="{percentage}% selesai"
		>
			{percentage}%
		</div>
	</div>

	<!-- progress-bar-track -->
	<div
		class="mb-3.5 h-2.5 overflow-hidden rounded-full bg-muted"
		role="progressbar"
		aria-valuenow={completed}
		aria-valuemin={0}
		aria-valuemax={total}
		aria-label="Progres belajar"
	>
		<!-- progress-bar-fill -->
		<div
			class="relative h-full overflow-hidden rounded-full bg-linear-to-r from-primary to-[#b3a3ff] transition-[width] duration-900 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
			style:width={mounted ? `${percentage}%` : '0%'}
		>
			<!-- progress-bar-glow -->
			<div
				class="absolute inset-0 animate-[shimmer_2.5s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/35 to-transparent"
			></div>
		</div>
	</div>

	<!-- footer -->
	<div class="flex items-center justify-between gap-3">
		<!-- xp-mini -->
		<div class="flex items-center gap-1.5 text-[0.78rem]">
			<!-- xp-earned -->
			<span
				class="rounded-full border border-[#fbbf24] bg-linear-to-br from-[#fef3c7] to-[#fde68a] px-2.5 py-0.5 font-bold text-[#d97706]"
			>
				{earnedXP} XP
			</span>
			<!-- separator -->
			<span class="text-muted-foreground">·</span>
			<!-- xp-total -->
			<span class="text-muted-foreground">{totalXP} XP total</span>
		</div>

		<!-- lesson-chips -->
		<div class="flex flex-wrap items-center justify-end gap-[3px] max-[500px]:hidden">
			{#each Array(Math.min(total, 15)) as _, i}
				<!-- lesson-pip -->
				<div
					class="h-2 w-2 rounded-full transition-[background,transform] duration-200 ease-out"
					class:bg-[var(--primary)]={i < completed || i === completed}
					class:bg-[var(--border)]={i > completed}
					class:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_20%,transparent)]={i ===
						completed}
					class:scale-[1.3]={i === completed}
					aria-hidden="true"
				></div>
			{/each}
			{#if total > 15}
				<!-- pip-more -->
				<span class="ml-0.5 text-[0.7rem] text-muted-foreground">+{total - 15}</span>
			{/if}
		</div>
	</div>
</div>
