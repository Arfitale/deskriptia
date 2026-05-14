<script lang="ts">
	import WelcomeHeader from '$lib/components/dashboard/WelcomeHeader.svelte';
	import ContinueLearningCard from '$lib/components/dashboard/ContinueLearningCard.svelte';
	import ProgressOverview from '$lib/components/dashboard/ProgressOverview.svelte';
	import CurrentTrackProgress from '$lib/components/dashboard/CurrentTrackProgress.svelte';
	import RecentAchievement from '$lib/components/dashboard/RecentAchievement.svelte';
	import QuickActions from '$lib/components/dashboard/QuickActions.svelte';
	import RecentLearningActivity from '$lib/components/dashboard/RecentLearningActivity.svelte';
	
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

	const prog = $derived(data.progression);
	
	// Mock recent activities (would normally come from DB)
	const recentActivities = [
		{ id: '1', title: 'Menyelesaikan "Struktur Teks Deskripsi"', type: 'complete' as const, time: '2 jam yang lalu' },
		{ id: '2', title: 'Mendapatkan +20 XP', type: 'xp' as const, time: '2 jam yang lalu' },
		{ id: '3', title: 'Membuka "Kaidah Kebahasaan"', type: 'unlock' as const, time: '2 jam yang lalu' },
	];
</script>

<svelte:head>
	<title>Dashboard — Deskriptia</title>
	<meta name="description" content="Dashboard pembelajaran teks deskriptif Deskriptia." />
</svelte:head>

<div class="mx-auto flex max-w-5xl flex-col gap-8 pb-12">
	<!-- Header -->
	<WelcomeHeader 
		userName={data.userName}
		level={prog.level}
		totalXP={prog.totalXP}
		levelTitle={prog.levelTitle}
	/>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
		<!-- Left Column: Main Content (takes up 2 columns on lg) -->
		<div class="flex flex-col gap-6 lg:col-span-2 lg:gap-8">
			<!-- Most Important Component -->
			{#if prog.continueLearning}
				<section aria-label="Lanjutkan Belajar">
					<ContinueLearningCard 
						currentNodeId={prog.continueLearning.nodeId}
						chapterTitle={prog.continueLearning.chapterTitle}
						title={prog.continueLearning.title}
						duration={prog.continueLearning.duration}
						xp={prog.continueLearning.xp}
						progressPercentage={prog.trackProgress}
					/>
				</section>
			{:else}
				<!-- Empty state when all is finished -->
				<div class="rounded-3xl border border-border bg-card p-8 text-center animate-in fade-in zoom-in-95 duration-500 ease-out">
					<h2 class="text-xl font-bold">Kamu sudah menyelesaikan semua materi! 🎉</h2>
					<p class="mt-2 text-muted-foreground">Ulangi pelajaran atau lakukan latihan menulis.</p>
				</div>
			{/if}

			<section aria-label="Ringkasan Progres">
				<ProgressOverview 
					totalXP={prog.totalXP}
					completedCount={prog.completedCount}
					streak={1}
					completedChapters={Math.floor(prog.completedCount / 3)}
				/>
			</section>

			<section aria-label="Pencapaian Terakhir">
				<RecentAchievement 
					title="Level {prog.level} Dicapai!" 
					description="Kamu baru saja naik level. Terus semangat!"
				/>
			</section>
		</div>

		<!-- Right Column: Sidebar (takes up 1 column on lg) -->
		<div class="flex flex-col gap-6 lg:gap-8">
			<section aria-label="Aksi Cepat">
				<QuickActions continueUrl={prog.continueLearning ? `/lesson/${prog.continueLearning.nodeId}` : '/learn'} />
			</section>

			<section aria-label="Progres Track">
				<CurrentTrackProgress 
					trackProgress={prog.trackProgress}
					completedCount={prog.completedCount}
					totalNodes={prog.totalNodes}
				/>
			</section>

			<section aria-label="Aktivitas Terakhir">
				<RecentLearningActivity activities={prog.completedCount > 0 ? recentActivities : []} />
			</section>
		</div>
	</div>
</div>
