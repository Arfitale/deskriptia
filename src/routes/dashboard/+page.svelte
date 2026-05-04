<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<main class="mx-auto min-h-screen max-w-5xl px-6 py-8">
	<h1 class="mb-2 text-3xl font-bold text-[#1F2937]">Dashboard</h1>
	<p class="mb-8 text-sm text-[#6B7280]">Welcome, {data.userName}. Continue your learning journey.</p>

	<section class="mb-10">
		<h2 class="mb-4 text-xl font-semibold text-[#1F2937]">Materials</h2>
		<div class="grid gap-4 md:grid-cols-2">
			{#each data.materials as material}
				<Card class="p-6 transition hover:-translate-y-0.5 hover:shadow-md">
					<div class="mb-3 flex items-center justify-between">
						<h3 class="font-semibold text-[#1F2937]">{material.title}</h3>
						<span class={`text-xs ${material.isLocked ? 'text-[#FF6B6B]' : 'text-[#6EE7B7]'}`}>
							{material.isLocked ? 'Locked' : 'Open'}
						</span>
					</div>
					<p class="mb-4 text-sm text-[#6B7280]">
						Quiz score: {material.score} {material.isQuizPassed ? '(passed)' : ''}
					</p>
					<div class="flex gap-2">
						<a href={`/materi/${material.slug}`} class={material.isLocked ? 'pointer-events-none' : ''}>
							<Button disabled={material.isLocked}>Open Material</Button>
						</a>
						<form method="POST" action="?/createDraft">
							<input type="hidden" name="materialId" value={material.id} />
							<Button variant="secondary" disabled={material.isLocked}>Start Practice</Button>
						</form>
					</div>
				</Card>
			{/each}
		</div>
	</section>

	<section>
		<h2 class="mb-4 text-xl font-semibold text-[#1F2937]">Your Drafts</h2>
		<div class="grid gap-4 md:grid-cols-2">
			{#if data.drafts.length === 0}
				<Card class="p-6">
					<p class="text-sm text-[#6B7280]">No drafts yet.</p>
				</Card>
			{:else}
				{#each data.drafts as draft}
					<Card class="p-6">
						<h3 class="font-semibold text-[#1F2937]">{draft.title}</h3>
						<p class="mb-3 text-sm text-[#6B7280]">
							Last updated: {new Date(draft.updatedAt).toLocaleString()}
						</p>
						<a href={`/latihan-baca/${draft.id}`}>
							<Button variant="secondary">Continue Draft</Button>
						</a>
					</Card>
				{/each}
			{/if}
		</div>
	</section>
</main>
