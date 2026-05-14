<script lang="ts">
	import ProfileHeader from '$lib/components/profile/ProfileHeader.svelte';
	import LearningStatistics from '$lib/components/profile/LearningStatistics.svelte';
	import AchievementPreview from '$lib/components/profile/AchievementPreview.svelte';
	import ProgressSummary from '$lib/components/profile/ProgressSummary.svelte';
	import RecentLearningActivity from '$lib/components/dashboard/RecentLearningActivity.svelte';
	import SectionTitle from '$lib/components/ui/SectionTitle.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const prog = $derived(data.progression);
	
	// Mock recent activities for the timeline
	const recentActivities = [
		{ id: '1', title: 'Belajar secara konsisten', type: 'xp' as const, time: 'Hari ini' },
		{ id: '2', title: 'Mendapatkan +20 XP', type: 'xp' as const, time: 'Kemarin' },
		{ id: '3', title: 'Membuka pelajaran baru', type: 'unlock' as const, time: 'Kemarin' },
	];
</script>

<svelte:head>
	<title>Profile — Deskriptia</title>
	<meta name="description" content="Profil dan pencapaian belajar kamu di Deskriptia." />
</svelte:head>

<div class="mx-auto flex max-w-4xl flex-col gap-8 pb-12">
	<!-- 1. Profile Header -->
	<section aria-label="Profil Pengguna">
		<ProfileHeader 
			userName={data.userName}
			level={prog.level}
			totalXP={prog.totalXP}
			levelTitle={prog.levelTitle}
			avatarText={data.userName.substring(0, 2).toUpperCase()}
			joinedAt={data.joinedAt}
		/>
	</section>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<div class="flex flex-col gap-8 lg:col-span-2">
			<!-- 2. Learning Statistics -->
			<section aria-label="Statistik Belajar">
				<SectionTitle title="Statistik Belajar" subtitle="Angka dari kerja kerasmu." />
				<LearningStatistics 
					completedLessons={prog.completedCount}
					completedChapters={prog.completedChapters}
					totalXP={prog.totalXP}
					streak={1}
				/>
			</section>

			<!-- 3. Achievement Preview -->
			<section aria-label="Pencapaian">
				<SectionTitle title="Pencapaian" subtitle="Lencana yang telah kamu kumpulkan." />
				<AchievementPreview 
					completedLessons={prog.completedCount}
					completedChapters={prog.completedChapters}
					totalXP={prog.totalXP}
				/>
			</section>
		</div>
		
		<div class="flex flex-col gap-8">
			<!-- 4. Progress Summary -->
			<section aria-label="Ringkasan Progres">
				<ProgressSummary 
					trackProgress={prog.trackProgress}
					completedLessons={prog.completedCount}
					totalNodes={prog.totalNodes}
				/>
			</section>

			<!-- 5. Recent Activity -->
			<section aria-label="Aktivitas Terakhir">
				<RecentLearningActivity activities={prog.completedCount > 0 ? recentActivities : []} />
			</section>
		</div>
	</div>
</div>
