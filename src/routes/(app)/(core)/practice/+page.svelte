<script lang="ts">
	import PracticeHeader from '$lib/components/practice/PracticeHeader.svelte';
	import PracticeCategoryGrid from '$lib/components/practice/PracticeCategoryGrid.svelte';
	import RandomPracticeCard from '$lib/components/practice/RandomPracticeCard.svelte';
	import RetryIncorrectCard from '$lib/components/practice/RetryIncorrectCard.svelte';
	import RecentLearningActivity from '$lib/components/dashboard/RecentLearningActivity.svelte';
	import SectionTitle from '$lib/components/ui/SectionTitle.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Practice — Deskriptia</title>
	<meta name="description" content="Latih kemampuan menulis teks deskriptif kamu." />
</svelte:head>

<div class="mx-auto flex max-w-4xl flex-col gap-10 pb-12">
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
		<section aria-label="Kategori Latihan" class="mt-2">
			<SectionTitle title="Kategori Latihan" subtitle="Pilih topik spesifik yang ingin kamu perdalam." />
			<PracticeCategoryGrid />
		</section>

		<!-- Recent Practice Activity -->
		<section aria-label="Riwayat Latihan" class="mt-4">
			<SectionTitle title="Riwayat Latihan" subtitle="Aktivitas latihan terbarumu." />
			<div class="max-w-xl">
				<RecentLearningActivity activities={data.recentPractice} />
			</div>
		</section>
	</div>
</div>
