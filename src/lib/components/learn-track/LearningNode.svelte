<script lang="ts">
	import {
		CircleCheck,
		Lock,
		BookOpen,
		CircleQuestionMark,
		Swords,
		Flag,
		Clock,
		Zap,
		ChevronRight
	} from '@lucide/svelte';
	import type { NodeType, NodeState } from '$lib/data/learnTrack';

	let {
		id,
		type,
		state,
		title,
		description,
		duration,
		xp,
		onclick
	}: {
		id: string;
		type: NodeType;
		state: NodeState;
		title: string;
		description: string;
		duration: number;
		xp: number;
		onclick?: () => void;
	} = $props();

	const typeConfig: Record<NodeType, { label: string; color: string }> = {
		lesson: { label: 'Pelajaran', color: '#9381ff' },
		quiz: { label: 'Kuis', color: '#f59e0b' },
		challenge: { label: 'Tantangan', color: '#ec4899' },
		checkpoint: { label: 'Checkpoint', color: '#10b981' },
		current: { label: 'Sedang Belajar', color: '#10b981' }
	};

	const isInteractive = $derived(
		state === 'current' || state === 'upcoming' || state === 'completed'
	);
	const isLocked = $derived(state === 'locked');
	const isCurrent = $derived(state === 'current');
	const isCompleted = $derived(state === 'completed');
	const config = $derived(typeConfig[type]);

	function handleClick() {
		if (!isLocked) {
			// Navigate to lesson route for lesson/quiz/challenge/current types
			if (type === 'lesson' || type === 'quiz' || type === 'challenge' || type === 'current') {
				window.location.href = `/lesson/${id}`;
			} else if (onclick) {
				onclick();
			}
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			onclick?.();
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class="flex items-start gap-4 outline-none"
	class:cursor-pointer={isInteractive}
	class:cursor-not-allowed={isLocked}
	class:opacity-55={isLocked}
	role={isInteractive ? 'button' : undefined}
	tabindex={isInteractive ? 0 : undefined}
	aria-label={isLocked
		? `${title} — terkunci`
		: `${title} — ${state === 'completed' ? 'selesai' : state === 'current' ? 'sedang berlangsung' : 'belum dimulai'}`}
	onclick={handleClick}
	onkeydown={handleKeyDown}
>
	<!-- State icon -->
	<div class="relative flex h-10 w-10 shrink-0 items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
		<div
			class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-[transform,box-shadow] duration-200 ease-out"
			class:bg-[var(--success)]={isCompleted}
			class:text-white={isCompleted || isCurrent}
			class:shadow-[0_0_0_3px_color-mix(in_srgb,var(--success)_15%,transparent)]={isCompleted}
			class:bg-[var(--primary)]={isCurrent}
			class:shadow-[0_0_0_4px_color-mix(in_srgb,var(--primary)_20%,transparent),0_4px_12px_rgba(147,129,255,0.4)]={isCurrent}
			class:bg-[var(--muted)]={!isCompleted && !isCurrent}
			class:text-[var(--muted-foreground)]={!isCompleted && !isCurrent}
			class:border-2={state === 'upcoming' || isLocked}
			class:border-[var(--border)]={state === 'upcoming' || isLocked}
			class:border-dashed={isLocked}
		>
			{#if isCompleted}
				<CircleCheck size={18} aria-hidden="true" />
			{:else if isLocked}
				<Lock size={16} aria-hidden="true" />
			{:else if type === 'lesson'}
				<BookOpen size={18} aria-hidden="true" />
			{:else if type === 'quiz'}
				<CircleQuestionMark size={18} aria-hidden="true" />
			{:else if type === 'challenge'}
				<Swords size={18} aria-hidden="true" />
			{:else}
				<Flag size={18} aria-hidden="true" />
			{/if}
		</div>

		{#if isCurrent}
			<div
				class="absolute -inset-1.5 animate-[pulse-ring_2.5s_ease-out_infinite] rounded-full border-2 border-primary opacity-0"
				aria-hidden="true"
			></div>
			<div
				class="absolute -inset-1.5 animate-[pulse-ring_2.5s_ease-out_infinite_1250ms] rounded-full border-2 border-primary opacity-0"
				aria-hidden="true"
			></div>
		{/if}
	</div>

	<!-- Content card -->
	<div
		class="group flex-1 rounded-2xl border-[1.5px] bg-(--surface) p-4 transition-[box-shadow,transform,border-color] duration-200 ease-out"
		class:border-[color-mix(in_srgb,var(--success)_25%,var(--border))]={isCompleted}
		class:bg-[color-mix(in_srgb,var(--success)_3%,var(--surface))]={isCompleted}
		class:border-[color-mix(in_srgb,var(--primary)_35%,var(--border))]={isCurrent}
		class:bg-[color-mix(in_srgb,var(--primary)_3%,var(--surface))]={isCurrent}
		class:shadow-[0_4px_20px_rgba(147,129,255,0.12)]={isCurrent}
		class:border-[var(--border)]={!isCompleted && !isCurrent}
		class:hover:translate-y-[-2px]={isInteractive}
		class:hover:shadow-[0_8px_24px_rgba(147,129,255,0.15)]={isInteractive}
		class:hover:border-[color-mix(in_srgb,var(--primary)_30%,var(--border))]={isInteractive}
		class:active:translate-y-0={isInteractive}
	>
		<!-- Top -->
		<div class="mb-3">
			<div class="mb-1.5 flex flex-wrap items-center gap-2">
				<div
					class="rounded-full border px-2.5 py-0.5 text-[0.67rem] font-bold tracking-[0.08em] uppercase"
					style="color: var(--type-color, var(--primary)); background: color-mix(in srgb, var(--type-color, var(--primary)) 12%, transparent); border-color: color-mix(in srgb, var(--type-color, var(--primary)) 22%, transparent); --type-color: {config.color}"
				>
					{config.label}
				</div>
				{#if isCompleted}
					<div
						class="rounded-full bg-[#d1fae5] px-2.5 py-0.5 text-[0.67rem] font-semibold text-[#065f46]"
					>
						✓ Selesai
					</div>
				{:else if isCurrent}
					<div
						class="animate-[status-pulse_2s_ease-in-out_infinite] rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-2.5 py-0.5 text-[0.67rem] font-semibold text-primary"
					>
						● Sedang belajar
					</div>
				{/if}
			</div>

			<h3
				class="m-0 mb-1 text-[0.92rem] leading-snug font-bold text-foreground max-sm:text-[0.86rem]"
			>
				{title}
			</h3>
			<p class="m-0 text-[0.8rem] leading-relaxed text-muted-foreground">
				{description}
			</p>
		</div>

		<!-- Footer -->
		<div class="flex items-center justify-between gap-3">
			<div class="flex items-center gap-2.5">
				<span
					class="inline-flex items-center gap-1 text-[0.75rem] font-medium text-muted-foreground"
				>
					<Clock size={12} aria-hidden="true" />
					{duration} mnt
				</span>
				<span
					class="inline-flex items-center gap-1 rounded-full border border-[#fbbf24] bg-linear-to-br from-[#fef3c7] to-[#fde68a] px-2 py-0.5 text-[0.75rem] font-bold text-[#d97706]"
				>
					<Zap size={12} aria-hidden="true" />
					+{xp} XP
				</span>
			</div>

			{#if !isLocked}
				<div
					class="inline-flex items-center gap-0.5 text-[0.78rem] font-semibold transition-colors duration-150"
					class:text-[var(--primary)]={isCurrent}
					class:text-[var(--muted-foreground)]={!isCurrent}
					class:group-hover:text-[var(--primary)]={!isCurrent}
				>
					{#if isCompleted}
						<span>Ulangi</span>
					{:else if isCurrent}
						<span>Mulai</span>
					{:else}
						<span>Buka</span>
					{/if}
					<ChevronRight size={14} aria-hidden="true" />
				</div>
			{/if}
		</div>
	</div>
</div>
