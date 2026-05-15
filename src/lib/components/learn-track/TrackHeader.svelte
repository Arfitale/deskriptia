<script lang="ts">
	import { Zap, BookOpen, TrendingUp } from '@lucide/svelte';

	let {
		title,
		subtitle,
		description,
		totalXP,
		earnedXP,
		completedLessons,
		totalLessons
	}: {
		title: string;
		subtitle: string;
		description: string;
		totalXP: number;
		earnedXP: number;
		completedLessons: number;
		totalLessons: number;
	} = $props();

	const xpPercentage = $derived(Math.round((earnedXP / totalXP) * 100));
</script>

<!-- track-header -->
<header
	class="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out relative flex items-center justify-between gap-6 overflow-hidden rounded-[20px] bg-linear-to-br from-[#6c55d9] via-[#9381ff] to-[#b3a3ff] p-8 shadow-[0_8px_32px_rgba(147,129,255,0.3),0_2px_8px_rgba(147,129,255,0.15)] max-[560px]:p-6"
>
	<!-- bg-orb-1 -->
	<div
		class="pointer-events-none absolute top-[-60px] right-[80px] h-[200px] w-[200px] rounded-full bg-white/[0.07]"
	></div>
	<!-- bg-orb-2 -->
	<div
		class="pointer-events-none absolute bottom-[-40px] left-[40%] h-[120px] w-[120px] rounded-full bg-white/5"
	></div>

	<!-- content -->
	<div class="relative z-10 flex-1">
		<!-- label -->
		<div
			class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/18 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.03em] text-white/92 uppercase"
		>
			<TrendingUp size={13} />
			<span>{subtitle}</span>
		</div>

		<!-- title -->
		<h1
			class="m-0 mb-2 text-2xl leading-tight font-extrabold tracking-tight text-white max-[560px]:text-[1.2rem]"
		>
			{title}
		</h1>

		<!-- description -->
		<p class="m-0 mb-5 max-w-[440px] text-[0.875rem] leading-[1.55] text-white/80">
			{description}
		</p>

		<!-- stats -->
		<div class="flex flex-wrap gap-2">
			<!-- stat-chip: lessons -->
			<div
				class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[0.78rem] font-semibold text-white backdrop-blur-sm"
			>
				<BookOpen size={13} />
				<span>{completedLessons}/{totalLessons} pelajaran</span>
			</div>
			<!-- stat-chip: xp -->
			<div
				class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[0.78rem] font-semibold text-white backdrop-blur-sm"
			>
				<Zap size={13} />
				<span>{earnedXP}/{totalXP} XP</span>
			</div>
			<!-- stat-chip: progress -->
			<div
				class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[0.78rem] font-semibold text-white backdrop-blur-sm"
			>
				<!-- stat-dot -->
				<span
					class="h-[7px] w-[7px] animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-[#6ee7b7] shadow-[0_0_6px_rgba(110,231,183,0.7)]"
				></span>
				<span>{xpPercentage}% selesai</span>
			</div>
		</div>
	</div>

	<!-- illustration -->
	<div
		class="relative z-10 flex h-[88px] w-[88px] shrink-0 items-center justify-center max-[560px]:hidden"
		aria-hidden="true"
	>
		<!-- illustration-ring: outer -->
		<div
			class="absolute h-[88px] w-[88px] animate-[rotate-ring_12s_linear_infinite] rounded-full border-2 border-white/20"
		></div>
		<!-- illustration-ring: inner -->
		<div
			class="absolute h-16 w-16 animate-[rotate-ring_8s_linear_infinite_reverse] rounded-full border-2 border-white/20"
		></div>
		<!-- illustration-icon -->
		<div
			class="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-white/30 bg-white/20 text-white backdrop-blur-sm"
		>
			<BookOpen size={28} />
		</div>
	</div>
</header>
