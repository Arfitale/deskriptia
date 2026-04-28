<script lang="ts">
	import { marked } from 'marked';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
const html = $derived(marked.parse(data.material.content));
</script>

<main class="mx-auto min-h-screen max-w-4xl px-6 py-8">
	<a href="/dashboard" class="mb-4 inline-block text-sm text-[#5D4FC4] hover:underline">← Back</a>
	<Card>
		<h1 class="mb-4 text-2xl font-bold text-[#1F2937]">{data.material.title}</h1>
		<article class="prose prose-slate max-w-none">
			{@html html}
		</article>
		<div class="mt-6">
			<a href={`/materi/${data.material.slug}/kuis`}>
				<Button>Start Quiz</Button>
			</a>
		</div>
	</Card>
</main>
