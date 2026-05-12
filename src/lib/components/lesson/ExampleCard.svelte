<script lang="ts">
	import type { ExampleSegment } from '$lib/data/lessonData';

	let { segments }: { segments: ExampleSegment[] } = $props();

	const colorMap: Record<
		ExampleSegment['color'],
		{ bg: string; border: string; label: string; dot: string }
	> = {
		purple: {
			bg: 'bg-[#f5f3ff]',
			border: 'border-[#c4b5fd]',
			label: 'text-[#6d28d9] bg-[#ede9fe]',
			dot: 'bg-[#8b5cf6]'
		},
		blue: {
			bg: 'bg-[#eff6ff]',
			border: 'border-[#93c5fd]',
			label: 'text-[#1d4ed8] bg-[#dbeafe]',
			dot: 'bg-[#3b82f6]'
		},
		green: {
			bg: 'bg-[#f0fdf4]',
			border: 'border-[#86efac]',
			label: 'text-[#15803d] bg-[#dcfce7]',
			dot: 'bg-[#22c55e]'
		},
		amber: {
			bg: 'bg-[#fffbeb]',
			border: 'border-[#fcd34d]',
			label: 'text-[#b45309] bg-[#fef3c7]',
			dot: 'bg-[#f59e0b]'
		}
	};
</script>

<section class="example-section animate-in">
	<div class="section-label">📝 Contoh Teks</div>
	<h2 class="section-title">Lihat Contoh Nyata</h2>
	<p class="section-sub">Perhatikan bagaimana teks deskripsi disusun di bawah ini.</p>

	<div class="example-card">
		{#each segments as seg, i}
			{@const c = colorMap[seg.color]}
			<div class="segment {c.bg} border {c.border}">
				<!-- label pill -->
				<span class="segment-label {c.label}">
					<span class="dot {c.dot}"></span>
					{seg.label}
				</span>
				<p class="segment-text">{seg.text}</p>
			</div>
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

	.example-section {
		padding: 1.5rem 1.25rem;
		border-top: 1px solid var(--border);
	}

	.section-label {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #6d28d9;
		background: #ede9fe;
		border-radius: 999px;
		padding: 0.25rem 0.75rem;
		margin-bottom: 0.75rem;
	}

	.section-title {
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--foreground);
		margin: 0 0 0.25rem;
	}

	.section-sub {
		font-size: 0.85rem;
		color: var(--muted-foreground);
		margin: 0 0 1.25rem;
	}

	.example-card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		border-radius: 18px;
		overflow: hidden;
		border: 1.5px solid var(--border);
		background: var(--surface);
		padding: 1rem;
	}

	.segment {
		border-radius: 12px;
		border-width: 1.5px;
		border-style: solid;
		padding: 0.875rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.segment-label {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.67rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		border-radius: 999px;
		padding: 0.2rem 0.65rem;
		align-self: flex-start;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		display: inline-block;
		flex-shrink: 0;
	}

	.segment-text {
		font-size: 0.875rem;
		line-height: 1.75;
		color: var(--foreground);
		margin: 0;
	}

	@media (max-width: 640px) {
		.example-section {
			padding: 1.25rem 1rem;
		}
	}
</style>
