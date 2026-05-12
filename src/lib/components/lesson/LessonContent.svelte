<script lang="ts">
	import type { ContentBlock } from '$lib/data/lessonData';

	let {
		title,
		blocks
	}: {
		title: string;
		blocks: ContentBlock[];
	} = $props();

	// Convert **bold** markdown to HTML
	function parseBold(text: string): string {
		return text.replace(/\*\*(.+?)\*\*/g, '<strong class="keyword">$1</strong>');
	}
</script>

<section class="micro-lesson animate-in">
	<div class="section-label">📚 Materi</div>
	<h2 class="lesson-title">{title}</h2>

	<div class="blocks">
		{#each blocks as block}
			{#if block.type === 'paragraph'}
				<p class="lesson-paragraph">
					{@html parseBold(block.text ?? '')}
				</p>
			{:else if block.type === 'highlight-list'}
				<ul class="highlight-list">
					{#each block.items ?? [] as item}
						<li>{@html parseBold(item)}</li>
					{/each}
				</ul>
			{:else if block.type === 'tip'}
				<div class="tip-block">
					<span class="tip-icon">💡</span>
					<p>{block.text}</p>
				</div>
			{/if}
		{/each}
	</div>
</section>

<style>
	.animate-in {
		animation: fadeSlideUp 0.4s ease both;
	}

	@keyframes fadeSlideUp {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.micro-lesson {
		padding: 2rem 1.25rem 1.5rem;
	}

	.section-label {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--primary);
		background: var(--primary-soft);
		border-radius: 999px;
		padding: 0.25rem 0.75rem;
		margin-bottom: 0.875rem;
	}

	.lesson-title {
		font-size: 1.35rem;
		font-weight: 800;
		color: var(--foreground);
		line-height: 1.3;
		margin: 0 0 1.25rem;
	}

	.blocks {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.lesson-paragraph {
		font-size: 0.975rem;
		line-height: 1.75;
		color: var(--foreground);
		margin: 0;
	}

	:global(.keyword) {
		color: var(--primary);
		background: var(--primary-soft);
		border-radius: 4px;
		padding: 0.05em 0.3em;
		font-weight: 700;
	}

	.highlight-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.highlight-list li {
		font-size: 0.93rem;
		line-height: 1.65;
		color: var(--foreground);
		background: var(--muted);
		border-radius: 12px;
		padding: 0.75rem 1rem;
		border-left: 3px solid var(--primary);
	}

	.tip-block {
		display: flex;
		gap: 0.75rem;
		background: linear-gradient(135deg, #f0fdf4, #dcfce7);
		border: 1px solid #86efac;
		border-radius: 14px;
		padding: 1rem 1.1rem;
		align-items: flex-start;
	}

	.tip-icon {
		font-size: 1.1rem;
		margin-top: 0.1rem;
		flex-shrink: 0;
	}

	.tip-block p {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.65;
		color: #15803d;
		font-style: italic;
	}

	@media (max-width: 640px) {
		.micro-lesson {
			padding: 1.5rem 1rem 1.25rem;
		}

		.lesson-title {
			font-size: 1.15rem;
		}
	}
</style>
