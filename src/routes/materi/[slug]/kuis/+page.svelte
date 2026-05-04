<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
let answers = $state<Record<number, number>>({});
let resultMessage = $state('');
let resultColor = $state('text-[#6B7280]');

	const submitQuiz = async () => {
		const response = await fetch(`/api/quiz/${data.quiz.id}/submit`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ answers })
		});
		const payload = await response.json();

		if (!response.ok) {
			resultMessage = payload.message ?? 'Failed to submit quiz.';
			resultColor = 'text-[#FF6B6B]';
			return;
		}

		resultMessage = `Score: ${payload.score}. ${payload.isPassed ? 'You passed!' : 'You did not pass yet.'}`;
		resultColor = payload.isPassed ? 'text-[#2f9e6d]' : 'text-[#FF6B6B]';
	};
</script>

<main class="mx-auto min-h-screen max-w-4xl px-6 py-8">
	<a href={`/materi/${data.material.slug}`} class="mb-4 inline-block text-sm text-[#5D4FC4] hover:underline"
		>← Back to Material</a
	>
	<Card class="p-6">
		<h1 class="mb-1 text-2xl font-bold text-[#1F2937]">{data.material.title} - Quiz</h1>
		<p class="mb-6 text-sm text-[#6B7280]">Minimum passing score: {data.quiz.passScore}</p>

		<div class="space-y-6">
			{#each data.questions as question, index}
				<div>
					<p class="mb-2 font-medium text-[#1F2937]">{index + 1}. {question.prompt}</p>
					<div class="space-y-2">
						{#each question.options as option, optionIndex}
							<label class="flex cursor-pointer items-center gap-2 text-sm text-[#1F2937]">
								<input
									type="radio"
									name={`question-${question.id}`}
									value={optionIndex}
									onchange={() => (answers[question.id] = optionIndex)}
								/>
								{option}
							</label>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-6 flex items-center gap-3">
			<Button onclick={submitQuiz}>Submit Quiz</Button>
			<p class={`text-sm ${resultColor}`}>{resultMessage}</p>
		</div>
	</Card>
</main>
