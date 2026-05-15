<script lang="ts">
	import PracticeHeader from '$lib/components/practice/PracticeHeader.svelte';
	import PracticeCategoryGrid from '$lib/components/practice/PracticeCategoryGrid.svelte';
	import RandomPracticeCard from '$lib/components/practice/RandomPracticeCard.svelte';
	import RetryIncorrectCard from '$lib/components/practice/RetryIncorrectCard.svelte';
	import RecentLearningActivity from '$lib/components/dashboard/RecentLearningActivity.svelte';
	import ContentSection from '$lib/components/ui/ContentSection.svelte';
	import PageContainer from '$lib/components/ui/PageContainer.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Practice — Deskriptia</title>
	<meta name="description" content="Latih kemampuan menulis teks deskriptif kamu." />
</svelte:head>

<PageContainer>
	<PracticeHeader 
		title="Practice" 
		description="Latih kembali pemahamanmu melalui latihan ringan dan cepat tanpa tekanan."
	/>

	<div class="flex flex-col gap-8">
		<!-- Quick Actions (Random & Retry) -->
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<RandomPracticeCard />
			{#if data.incorrectAnswersCount > 0}
				<RetryIncorrectCard incorrectCount={data.incorrectAnswersCount} />
			{/if}
		</div>

		<!-- Main Categories -->
		<ContentSection title="Kategori Latihan" subtitle="Pilih topik spesifik yang ingin kamu perdalam." class="mt-2">
			<PracticeCategoryGrid />
		</ContentSection>

		<!-- Recent Practice Activity -->
		<ContentSection title="Riwayat Latihan" subtitle="Aktivitas latihan terbarumu." class="mt-4">
			<div class="max-w-xl">
				<RecentLearningActivity activities={data.recentPractice} />
			</div>
		</ContentSection>
	</div>
</PageContainer>
