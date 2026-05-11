<script lang="ts">
	import { Zap, Star, ChevronRight, PartyPopper } from '@lucide/svelte';

	let {
		show = false,
		lessonTitle = '',
		xpEarned = 0,
		nextLessonTitle = '',
		onclose,
		oncontinue
	}: {
		show?: boolean;
		lessonTitle?: string;
		xpEarned?: number;
		nextLessonTitle?: string;
		onclose?: () => void;
		oncontinue?: () => void;
	} = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) onclose?.();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose?.();
	}
</script>

{#if show}
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div
		class="fixed inset-0 z-50 flex animate-[fade-in_0.2s_ease] items-center justify-center bg-black/45 p-4 backdrop-blur-md"
		role="dialog"
		aria-modal="true"
		aria-label="Pelajaran selesai"
		onclick={handleBackdropClick}
		onkeydown={handleKeyDown}
	>
		<div
			class="relative w-full max-w-[380px] animate-[scale-in_0.28s_cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden rounded-3xl border border-border bg-(--surface) px-8 py-10 text-center shadow-[0_24px_64px_rgba(147,129,255,0.2),0_8px_24px_rgba(0,0,0,0.12)]"
		>
			<!-- Confetti dots -->
			<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
				<div
					class="absolute top-[10%] left-[15%] h-2 w-2 animate-[confetti-fall_3s_ease-in-out_infinite_0s] rounded-full bg-[#9381ff]"
				></div>
				<div
					class="absolute top-[5%] left-[70%] h-2 w-2 animate-[confetti-fall_3s_ease-in-out_infinite_300ms] rounded-full bg-[#6ee7b7]"
				></div>
				<div
					class="absolute top-[20%] right-[10%] h-2 w-2 animate-[confetti-fall_3s_ease-in-out_infinite_600ms] rounded-full bg-[#fbbf24]"
				></div>
				<div
					class="absolute top-[15%] left-[45%] h-2 w-2 animate-[confetti-fall_3s_ease-in-out_infinite_900ms] rounded-full bg-[#f472b6]"
				></div>
				<div
					class="absolute bottom-[30%] left-[5%] h-2 w-2 animate-[confetti-fall_3s_ease-in-out_infinite_1200ms] rounded-full bg-[#60a5fa]"
				></div>
				<div
					class="absolute right-[15%] bottom-[20%] h-2 w-2 animate-[confetti-fall_3s_ease-in-out_infinite_1500ms] rounded-full bg-[#a78bfa]"
				></div>
				<div
					class="absolute bottom-[40%] left-[60%] h-2 w-2 animate-[confetti-fall_3s_ease-in-out_infinite_400ms] rounded-full bg-[#34d399]"
				></div>
				<div
					class="absolute top-[40%] left-[90%] h-2 w-2 animate-[confetti-fall_3s_ease-in-out_infinite_800ms] rounded-full bg-[#fb923c]"
				></div>
			</div>

			<!-- Icon -->
			<div class="relative mb-5 inline-flex items-center justify-center" aria-hidden="true">
				<div
					class="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-[22px] bg-linear-to-br from-[#9381ff] to-[#b3a3ff] text-white shadow-[0_8px_24px_rgba(147,129,255,0.4)]"
				>
					<PartyPopper size={32} />
				</div>
				<div
					class="absolute -inset-2.5 animate-[ring-pulse_2s_ease-in-out_infinite] rounded-[30px] border-2 border-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
				></div>
			</div>

			<!-- Heading -->
			<h2 class="mb-1 text-2xl font-extrabold tracking-tight text-foreground">
				Pelajaran Selesai!
			</h2>
			{#if lessonTitle}
				<p class="mb-6 text-[0.85rem] text-muted-foreground">"{lessonTitle}"</p>
			{/if}

			<!-- XP Reward -->
			<div
				class="mb-5 rounded-2xl border border-[#fbbf24] bg-linear-to-br from-[#fef3c7] to-[#fde68a] p-4"
			>
				<div class="mb-1.5 text-[0.72rem] font-semibold tracking-[0.08em] text-[#92400e] uppercase">
					XP yang kamu dapat
				</div>
				<div
					class="flex items-center justify-center gap-1.5 text-[2rem] font-extrabold tracking-[-0.04em] text-[#b45309]"
				>
					<Zap size={22} aria-hidden="true" />
					+{xpEarned} XP
				</div>
			</div>

			<!-- Stars -->
			<div
				class="mb-5 flex items-center justify-center gap-2"
				aria-label="3 bintang"
				aria-hidden="true"
			>
				<Star
					size={24}
					class="animate-[star-pop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_150ms_both] text-[#fbbf24] drop-shadow-[0_2px_6px_rgba(251,191,36,0.5)]"
					fill="currentColor"
				/>
				<Star
					size={24}
					class="animate-[star-pop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_300ms_both] text-[#fbbf24] drop-shadow-[0_2px_6px_rgba(251,191,36,0.5)]"
					fill="currentColor"
				/>
				<Star
					size={24}
					class="animate-[star-pop.4s_cubic-bezier(0.34,1.56,0.64,1)_450ms_both] text-[#fbbf24] drop-shadow-[0_2px_6px_rgba(251,191,36,0.5)]"
					fill="currentColor"
				/>
			</div>

			<!-- Next lesson unlocked -->
			{#if nextLessonTitle}
				<div
					class="mb-6 flex items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--primary)_20%,transparent)] bg-[color-mix(in_srgb,var(--primary)_8%,var(--surface))] p-3.5 text-left"
				>
					<span class="shrink-0 text-[1.4rem]" aria-hidden="true">🔓</span>
					<div class="flex flex-col gap-0.5">
						<span class="text-[0.68rem] font-semibold tracking-[0.08em] text-primary uppercase">
							Pelajaran berikutnya terbuka
						</span>
						<span class="text-[0.84rem] font-semibold text-foreground">
							{nextLessonTitle}
						</span>
					</div>
				</div>
			{/if}

			<!-- Actions -->
			<div class="flex flex-col gap-2.5">
				<button
					class="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-linear-to-br from-primary to-[#b3a3ff] px-5 py-2.5 text-[0.9rem] font-bold text-white shadow-[0_4px_16px_rgba(147,129,255,0.35)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(147,129,255,0.45)] active:translate-y-0"
					onclick={oncontinue}
					type="button"
				>
					Lanjutkan
					<ChevronRight size={16} />
				</button>
				<button
					class="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-muted px-5 py-2.5 text-[0.9rem] font-bold text-muted-foreground transition-[background,color] duration-150 ease-out hover:bg-border hover:text-foreground"
					onclick={onclose}
					type="button"
				>
					Kembali ke Track
				</button>
			</div>
		</div>
	</div>
{/if}
