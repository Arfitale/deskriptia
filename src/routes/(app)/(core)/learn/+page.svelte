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

<div class="learn-page">
	<!-- Track Header -->
	<TrackHeader
		title={learnTrack.title}
		subtitle={learnTrack.subtitle}
		description={learnTrack.description}
		totalXP={learnTrack.totalXP}
		earnedXP={learnTrack.earnedXP}
		completedLessons={learnTrack.completedLessons}
		totalLessons={learnTrack.totalLessons}
	/>

	<!-- Progress Summary -->
	<TrackProgressBar
		completed={learnTrack.completedLessons}
		total={learnTrack.totalLessons}
		earnedXP={learnTrack.earnedXP}
		totalXP={learnTrack.totalXP}
	/>

	<!-- Roadmap -->
	<div class="roadmap">
		{#each learnTrack.chapters as chapter, chapterIdx (chapterIdx)}
			<!-- Chapter divider between chapters (not before first) -->
			{#if chapterIdx > 0}
				<div class="chapter-divider" aria-hidden="true">
					<div class="chapter-divider__line"></div>
					<div class="chapter-divider__dot"></div>
					<div class="chapter-divider__line"></div>
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

		<!-- End of roadmap marker -->
		<div class="roadmap-end" aria-label="Akhir dari track ini">
			<div class="roadmap-end__line"></div>
			<div class="roadmap-end__badge">
				<span>🏁</span>
				<span>Akhir Track</span>
			</div>
		</div>
	</div>
</div>

<!-- Completion Modal -->
<CompletionModal
	show={showModal}
	lessonTitle={completedNode?.title ?? ''}
	xpEarned={completedNode?.xp ?? 0}
	// {nextNodeTitle}
	onclose={closeModal}
	oncontinue={closeModal}
/>

<style>
	.learn-page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 640px;
		margin: 0 auto;
		width: 100%;
	}

	/* Roadmap container */
	.roadmap {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	/* Chapter divider */
	.chapter-divider {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin: 1.5rem 0 1.75rem;
		padding-left: 19px; /* align with node center */
	}

	.chapter-divider__line {
		flex: 1;
		height: 1px;
		background: var(--border);
	}

	.chapter-divider__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--border);
		flex-shrink: 0;
	}

	/* End of roadmap */
	.roadmap-end {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-left: 19px;
		margin-top: 0.5rem;
	}

	.roadmap-end__line {
		width: 2px;
		height: 28px;
		background: var(--border);
		border-radius: 99px;
	}

	.roadmap-end__badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: var(--muted);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 0.5rem 1rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--muted-foreground);
		margin-top: 0.5rem;
	}
</style>
