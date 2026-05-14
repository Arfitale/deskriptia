<script lang="ts">
	import AppCard from '$lib/components/ui/AppCard.svelte';
	import SectionTitle from '$lib/components/ui/SectionTitle.svelte';
	import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	import XPBadge from '$lib/components/ui/XPBadge.svelte';
	import { Button } from '$lib/components/ui/button';
	import { BookOpen, PenLine, Lock, ArrowRight, TrendingUp, Zap, Clock, Play } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { progressionStore } from '$lib/stores/progressionStore.svelte';

	let { data }: { data: PageData } = $props();

	// Initialize progression store
	$effect(() => {
		if (data.progression) {
			progressionStore.initialize({
				totalXP: data.progression.totalXP,
				level: data.progression.level,
				currentNodeId: data.progression.continueLearning?.nodeId ?? 'node-1-1',
				currentTrackId: 'track-1',
				completedNodeIds: [],
				lastActivityAt: null
			});
		}
	});

	// Greeting based on time of day
	const hour = new Date().getHours();
	const greeting = hour < 12 ? 'Selamat pagi' : hour < 17 ? 'Selamat siang' : 'Selamat malam';

	const prog = $derived(data.progression);
</script>

<svelte:head>
	<title>Dashboard — Deskriptia</title>
	<meta name="description" content="Dashboard pembelajaran teks deskriptif Deskriptia." />
</svelte:head>

<div class="flex flex-col gap-6">
	<!-- Page header -->
	<header class="flex items-start justify-between gap-4">
		<div>
			<p class="mb-0.5 text-sm text-muted-foreground">{greeting} 👋</p>
			<h1 class="mb-1 text-[1.75rem] leading-tight font-extrabold tracking-tight text-foreground">
				Halo, {data.userName}!
			</h1>
			<p class="text-sm text-muted-foreground">Lanjutkan perjalanan belajarmu hari ini.</p>
		</div>
		<XPBadge xp={prog.totalXP} />
	</header>

	<!-- Level & XP progress card -->
	<div
		class="relative overflow-hidden rounded-2xl border border-border bg-(--surface) p-5 shadow-[0_4px_16px_rgba(147,129,255,0.07)]"
	>
		<!-- Level badge -->
		<div class="mb-3 flex items-center justify-between gap-3">
			<div class="flex items-center gap-2.5">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-[#b3a3ff] text-sm font-extrabold text-white shadow-[0_4px_12px_rgba(147,129,255,0.35)]"
				>
					{prog.level}
				</div>
				<div class="flex flex-col">
					<span class="text-sm font-bold text-foreground">Level {prog.level}</span>
					<span class="text-xs font-medium text-muted-foreground">{prog.levelTitle}</span>
				</div>
			</div>
			<div
				class="inline-flex items-center gap-1 rounded-full border border-[#fbbf24] bg-linear-to-br from-[#fef3c7] to-[#fde68a] px-2.5 py-1 text-xs font-bold text-[#d97706]"
			>
				<Zap size={12} />
				{prog.totalXP} XP
			</div>
		</div>

		<!-- Level progress bar -->
		<div class="mb-2">
			<div class="h-2 overflow-hidden rounded-full bg-muted">
				<div
					class="relative h-full overflow-hidden rounded-full bg-linear-to-r from-primary to-[#b3a3ff] transition-[width] duration-700 ease-out"
					style:width="{prog.xpProgress.progressPercentage}%"
				>
					<div
						class="absolute inset-0 animate-[shimmer_2.5s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/35 to-transparent"
					></div>
				</div>
			</div>
		</div>
		<div class="flex justify-between text-[0.68rem] text-muted-foreground">
			<span>{prog.xpProgress.currentLevelXP} XP</span>
			<span>{prog.xpProgress.nextLevelXP} XP</span>
		</div>
	</div>

	<!-- Quick stats strip -->
	<div
		class="flex items-center rounded-2xl border border-border bg-(--surface) px-6 py-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
	>
		<div class="flex flex-1 flex-col items-center gap-0.5">
			<span class="text-2xl font-extrabold tracking-tight text-foreground">{prog.completedCount}</span>
			<span class="text-xs text-muted-foreground">✅ Selesai</span>
		</div>
		<div class="mx-3 h-10 w-px bg-border" aria-hidden="true"></div>
		<div class="flex flex-1 flex-col items-center gap-0.5">
			<span class="text-2xl font-extrabold tracking-tight text-foreground">{prog.totalNodes}</span>
			<span class="text-xs text-muted-foreground">📚 Total Materi</span>
		</div>
		<div class="mx-3 h-10 w-px bg-border" aria-hidden="true"></div>
		<div class="flex flex-1 flex-col items-center gap-0.5">
			<span class="text-2xl font-extrabold tracking-tight text-foreground">{prog.trackProgress}%</span>
			<span class="text-xs text-muted-foreground">📈 Progres</span>
		</div>
	</div>

	<!-- Continue Learning -->
	{#if prog.continueLearning}
		<section aria-labelledby="continue-heading">
			<SectionTitle
				title="Lanjutkan Belajar"
				subtitle="Mulai dari tempat terakhirmu."
			/>

			<a
				href="/lesson/{prog.continueLearning.nodeId}"
				class="group block rounded-2xl border-[1.5px] border-[color-mix(in_srgb,var(--primary)_30%,var(--border))] bg-[color-mix(in_srgb,var(--primary)_3%,var(--surface))] p-5 shadow-[0_4px_20px_rgba(147,129,255,0.1)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(147,129,255,0.18)] hover:border-[color-mix(in_srgb,var(--primary)_45%,var(--border))]"
			>
				<div class="mb-3 flex items-center gap-2">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-[0_3px_10px_rgba(147,129,255,0.35)]"
					>
						<Play size={14} />
					</div>
					<div
						class="rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] px-2.5 py-0.5 text-[0.68rem] font-semibold tracking-wider text-primary uppercase"
					>
						{prog.continueLearning.chapterTitle}
					</div>
				</div>

				<h3 class="mb-1.5 text-base font-bold text-foreground">
					{prog.continueLearning.title}
				</h3>

				<div class="flex items-center gap-3">
					<span class="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
						<Clock size={12} />
						{prog.continueLearning.duration} mnt
					</span>
					<span
						class="inline-flex items-center gap-1 rounded-full border border-[#fbbf24] bg-linear-to-br from-[#fef3c7] to-[#fde68a] px-2 py-0.5 text-xs font-bold text-[#d97706]"
					>
						<Zap size={11} />
						+{prog.continueLearning.xp} XP
					</span>
					<span
						class="ml-auto inline-flex items-center gap-0.5 text-xs font-semibold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
					>
						Lanjutkan
						<ArrowRight size={13} />
					</span>
				</div>
			</a>
		</section>
	{/if}

	<!-- Track progress -->
	<section aria-labelledby="track-heading">
		<SectionTitle
			title="Track Belajar"
			subtitle="Lihat progres jalur belajarmu."
		/>

		<a
			href="/learn"
			class="group flex items-center justify-between rounded-2xl border border-border bg-(--surface) p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(147,129,255,0.1)] hover:border-[color-mix(in_srgb,var(--primary)_25%,var(--border))]"
		>
			<div class="flex items-center gap-4">
				<div
					class="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#6c55d9] via-[#9381ff] to-[#b3a3ff] text-white shadow-[0_4px_14px_rgba(147,129,255,0.35)]"
				>
					<BookOpen size={22} />
				</div>
				<div class="flex flex-col gap-0.5">
					<span class="text-sm font-bold text-foreground">Track 1 — Teks Deskripsi Dasar</span>
					<span class="text-xs text-muted-foreground">
						{prog.completedCount}/{prog.totalNodes} pelajaran · {prog.trackProgress}% selesai
					</span>
				</div>
			</div>
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 group-hover:bg-primary group-hover:text-white"
			>
				<ArrowRight size={16} />
			</div>
		</a>
	</section>

	<!-- Materials section -->
	<section aria-labelledby="materials-heading">
		<SectionTitle
			title="Materi Pembelajaran"
			subtitle="Ikuti urutan materi untuk hasil terbaik."
		/>

		<div class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
			{#each data.materials as material}
				<AppCard variant={material.isLocked ? 'default' : 'interactive'} class="flex flex-col gap-3 {material.isLocked ? 'opacity-65' : ''}">
					<div class="flex items-center justify-between">
						<div
							class="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-primary-soft text-primary"
							aria-hidden="true"
						>
							{#if material.isLocked}
								<Lock size={18} />
							{:else}
								<BookOpen size={18} />
							{/if}
						</div>
						<span
							class="rounded-full px-2.5 py-0.5 text-[0.72rem] font-semibold"
							class:bg-[color-mix(in_srgb,var(--success)_15%,transparent)]={!material.isLocked}
							class:text-[#065f46]={!material.isLocked}
							class:bg-[color-mix(in_srgb,#718096_12%,transparent)]={material.isLocked}
							class:text-[#718096]={material.isLocked}
						>
							{material.isLocked ? 'Terkunci' : (material.isQuizPassed ? 'Selesai' : 'Tersedia')}
						</span>
					</div>

					<h2 class="m-0 text-[0.95rem] leading-snug font-bold text-foreground">{material.title}</h2>

					{#if !material.isLocked}
						<div class="mt-1">
							<ProgressBar value={material.score} max={100} showLabel label="Skor Quiz" />
						</div>
					{/if}

					<div class="mt-auto flex flex-wrap gap-2">
						<a href={material.isLocked ? undefined : `/materi/${material.slug}`} class:pointer-events-none={material.isLocked}>
							<Button disabled={material.isLocked} size="sm">
								Buka Materi
							</Button>
						</a>
						<form method="POST" action="?/createDraft">
							<input type="hidden" name="materialId" value={material.id} />
							<Button variant="secondary" size="sm" disabled={material.isLocked} type="submit">
								Mulai Latihan
							</Button>
						</form>
					</div>
				</AppCard>
			{/each}
		</div>
	</section>

	<!-- Drafts section -->
	<section aria-labelledby="drafts-heading">
		<SectionTitle title="Draf Kamu" subtitle="Lanjutkan tulisan yang belum selesai." />

		{#if data.drafts.length === 0}
			<AppCard variant="default" class="text-center">
				<div class="flex flex-col items-center gap-3 px-4 py-6">
					<span class="text-[2.5rem]" aria-hidden="true">📝</span>
					<p class="m-0 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
						Belum ada draf. Mulai latihan menulis dari materi di atas!
					</p>
				</div>
			</AppCard>
		{:else}
			<div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
				{#each data.drafts as draft}
					<AppCard variant="interactive" class="flex flex-col gap-2">
						<div class="flex items-center justify-between">
							<PenLine size={16} class="text-primary" aria-hidden="true" />
							<span class="text-[0.72rem] text-muted-foreground">
								{new Date(draft.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
							</span>
						</div>
						<h3 class="m-0 flex-1 text-sm font-semibold text-foreground">{draft.title}</h3>
						<a href={`/latihan-baca/${draft.id}`} class="mt-auto">
							<Button variant="secondary" size="sm" class="w-full justify-center">
								Lanjutkan
								<ArrowRight size={14} />
							</Button>
						</a>
					</AppCard>
				{/each}
			</div>
		{/if}
	</section>
</div>
