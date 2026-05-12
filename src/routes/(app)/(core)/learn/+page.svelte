<script lang="ts">
	import TrackHeader from '$lib/components/learn-track/TrackHeader.svelte';
	import TrackProgressBar from '$lib/components/learn-track/TrackProgressBar.svelte';
	import ChapterSection from '$lib/components/learn-track/ChapterSection.svelte';
	import LearningNode from '$lib/components/learn-track/LearningNode.svelte';
	import NodeConnector from '$lib/components/learn-track/NodeConnector.svelte';
	import CompletionModal from '$lib/components/learn-track/CompletionModal.svelte';
	import { learnTrack } from '$lib/data/learnTrack';
	import type { LearningNode as LearningNodeType } from '$lib/data/learnTrack';

	// Modal state
	let showModal = $state(false);
	let completedNode = $state<LearningNodeType | null>(null);
	let nextNodeTitle = $state('');

	function handleNodeClick(node: LearningNodeType, chapterIdx: number, nodeIdx: number) {
		if (node.state === 'locked') return;

		if (node.state === 'current') {
			// Simulate completing the current node → show modal
			const chapter = learnTrack.chapters[chapterIdx];
			const nextNode = chapter.nodes[nodeIdx + 1] ?? learnTrack.chapters[chapterIdx + 1]?.nodes[0];
			completedNode = node;
			nextNodeTitle = nextNode?.title ?? '';
			showModal = true;
		}
	}

	function closeModal() {
		showModal = false;
		completedNode = null;
	}
</script>

<svelte:head>
	<title>Learn Track — Deskriptia</title>
	<meta
		name="description"
		content="Ikuti jalur belajar terstruktur untuk menguasai teks deskriptif Bahasa Indonesia."
	/>
</svelte:head>

<!-- learn-page -->
<div class="mx-auto flex w-full max-w-[640px] flex-col gap-6">
	<!-- TrackHeader -->
	<TrackHeader
		title={learnTrack.title}
		subtitle={learnTrack.subtitle}
		description={learnTrack.description}
		totalXP={learnTrack.totalXP}
		earnedXP={learnTrack.earnedXP}
		completedLessons={learnTrack.completedLessons}
		totalLessons={learnTrack.totalLessons}
	/>

	<!-- TrackProgressBar -->
	<TrackProgressBar
		completed={learnTrack.completedLessons}
		total={learnTrack.totalLessons}
		earnedXP={learnTrack.earnedXP}
		totalXP={learnTrack.totalXP}
	/>

	<!-- roadmap -->
	<div class="flex flex-col">
		{#each learnTrack.chapters as chapter, chapterIdx (chapterIdx)}
			<!-- chapter-divider -->
			{#if chapterIdx > 0}
				<div class="my-6 flex items-center gap-3 pl-[19px]" aria-hidden="true">
					<!-- divider-line -->
					<div class="h-px flex-1 bg-border"></div>
					<!-- divider-dot -->
					<div class="h-2 w-2 shrink-0 rounded-full bg-border"></div>
					<!-- divider-line -->
					<div class="h-px flex-1 bg-border"></div>
				</div>
			{/if}

			<ChapterSection
				babLabel={chapter.title}
				title={chapter.subtitle}
				description={chapter.description}
				nodeCount={chapter.nodes.length}
				completedCount={chapter.nodes.filter((n) => n.state === 'completed').length}
			>
				{#each chapter.nodes as node, nodeIdx (nodeIdx)}
					<LearningNode
						id={node.id}
						type={node.type}
						state={node.state}
						title={node.title}
						description={node.description}
						duration={node.duration}
						xp={node.xp}
						onclick={() => handleNodeClick(node, chapterIdx, nodeIdx)}
					/>

					{#if nodeIdx < chapter.nodes.length - 1}
						<NodeConnector state={node.state} />
					{/if}
				{/each}
			</ChapterSection>
		{/each}

		<!-- roadmap-end -->
		<div class="mt-2 flex flex-col items-start pl-[19px]" aria-label="Akhir dari track ini">
			<!-- end-line -->
			<div class="h-7 w-0.5 rounded-full bg-border"></div>
			<!-- end-badge -->
			<div
				class="mt-2 inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted px-4 py-2 text-[0.8rem] font-semibold text-muted-foreground"
			>
				<span>🏁</span>
				<span>Akhir Track</span>
			</div>
		</div>
	</div>
</div>

<!-- CompletionModal -->
<CompletionModal
	show={showModal}
	lessonTitle={completedNode?.title ?? ''}
	xpEarned={completedNode?.xp ?? 0}
	onclose={closeModal}
	oncontinue={closeModal}
/>
