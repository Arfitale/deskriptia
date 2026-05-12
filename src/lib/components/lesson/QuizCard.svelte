<script lang="ts">
	import type { QuizQuestion } from '$lib/data/lessonData';
	import { CheckCircle, XCircle, ChevronRight } from '@lucide/svelte';
	import FeedbackBanner from './FeedbackBanner.svelte';

	let {
		questions,
		oncomplete
	}: {
		questions: QuizQuestion[];
		oncomplete: () => void;
	} = $props();

	let currentQ = $state(0);
	let selectedIdx = $state<number | null>(null);
	let answeredState = $state<'idle' | 'correct' | 'incorrect'>('idle');
	let score = $state(0);
	let showExplanation = $state(false);

	const question = $derived(questions[currentQ]);
	const isLast = $derived(currentQ === questions.length - 1);
	const progress = $derived(currentQ / questions.length);

	function selectAnswer(idx: number) {
		if (answeredState !== 'idle') return;
		selectedIdx = idx;
		const correct = idx === question.correctIndex;
		answeredState = correct ? 'correct' : 'incorrect';
		if (correct) score++;
		showExplanation = true;
	}

	function next() {
		if (isLast) {
			oncomplete();
		} else {
			currentQ++;
			selectedIdx = null;
			answeredState = 'idle';
			showExplanation = false;
		}
	}

	function retry() {
		selectedIdx = null;
		answeredState = 'idle';
		showExplanation = false;
	}
</script>

<section class="quiz-section animate-in">
	<div class="section-label">🧠 Mini Kuis</div>
	<h2 class="section-title">Uji Pemahamanmu</h2>

	<!-- Quiz progress dots -->
	<div class="quiz-dots" aria-label="Progres kuis">
		{#each questions as _, i}
			<div
				class="dot"
				class:done={i < currentQ}
				class:active={i === currentQ}
			></div>
		{/each}
	</div>

	<div class="quiz-card">
		<!-- Question header -->
		<div class="q-header">
			<span class="q-counter">Soal {currentQ + 1} / {questions.length}</span>
		</div>

		<p class="q-text">{question.question}</p>

		<!-- Answer options -->
		<div class="answers">
			{#each question.options as option, idx}
				<button
					class="answer-btn"
					class:correct={answeredState !== 'idle' && idx === question.correctIndex}
					class:incorrect={answeredState === 'incorrect' && idx === selectedIdx && idx !== question.correctIndex}
					class:dimmed={answeredState !== 'idle' && idx !== question.correctIndex && idx !== selectedIdx}
					disabled={answeredState !== 'idle'}
					onclick={() => selectAnswer(idx)}
				>
					<span class="answer-letter">{String.fromCharCode(65 + idx)}</span>
					<span class="answer-text">{option}</span>
					{#if answeredState !== 'idle' && idx === question.correctIndex}
						<CheckCircle size={16} class="ml-auto shrink-0 text-green-600" />
					{:else if answeredState === 'incorrect' && idx === selectedIdx}
						<XCircle size={16} class="ml-auto shrink-0 text-red-400" />
					{/if}
				</button>
			{/each}
		</div>

		<!-- Feedback -->
		{#if answeredState !== 'idle'}
			<div class="feedback-area">
				{#if answeredState === 'correct'}
					<FeedbackBanner variant="success" message="Benar! {question.explanation}" />
				{:else}
					<FeedbackBanner variant="error" message="Belum tepat. {question.explanation}" />
				{/if}
			</div>
		{/if}
	</div>

	<!-- Action row -->
	<div class="quiz-actions">
		{#if answeredState === 'incorrect'}
			<button class="btn-retry" onclick={retry}>
				Coba Lagi
			</button>
		{/if}
		{#if answeredState !== 'idle'}
			<button class="btn-next" onclick={next}>
				{isLast ? 'Selesai 🎉' : 'Soal Berikutnya'}
				{#if !isLast}<ChevronRight size={16} />{/if}
			</button>
		{/if}
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

	.quiz-section {
		padding: 1.5rem 1.25rem 1rem;
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
		margin: 0 0 1rem;
	}

	.quiz-dots {
		display: flex;
		gap: 0.375rem;
		margin-bottom: 1.25rem;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--border);
		transition: all 0.3s ease;
	}

	.dot.active {
		background: var(--primary);
		width: 20px;
		border-radius: 4px;
	}

	.dot.done {
		background: var(--success, #6ee7b7);
	}

	.quiz-card {
		background: var(--surface);
		border: 1.5px solid var(--border);
		border-radius: 18px;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.q-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.q-counter {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--primary);
		background: var(--primary-soft);
		border-radius: 999px;
		padding: 0.2rem 0.65rem;
	}

	.q-text {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--foreground);
		line-height: 1.6;
		margin: 0;
	}

	.answers {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.answer-btn {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		border: 1.5px solid var(--border);
		background: var(--surface);
		border-radius: 12px;
		padding: 0.75rem 0.875rem;
		font-size: 0.875rem;
		color: var(--foreground);
		cursor: pointer;
		text-align: left;
		transition: all 0.18s ease;
		width: 100%;
	}

	.answer-btn:hover:not(:disabled) {
		border-color: var(--primary);
		background: var(--primary-soft);
		transform: translateY(-1px);
	}

	.answer-btn:disabled {
		cursor: default;
	}

	.answer-btn.correct {
		border-color: #22c55e;
		background: #f0fdf4;
		color: #15803d;
		font-weight: 600;
		box-shadow: 0 0 0 3px #dcfce7;
	}

	.answer-btn.incorrect {
		border-color: #fca5a5;
		background: #fef2f2;
		color: #dc2626;
	}

	.answer-btn.dimmed {
		opacity: 0.45;
	}

	.answer-letter {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.6rem;
		height: 1.6rem;
		background: var(--muted);
		border-radius: 6px;
		font-size: 0.72rem;
		font-weight: 800;
		color: var(--muted-foreground);
		flex-shrink: 0;
	}

	.answer-text {
		flex: 1;
		line-height: 1.45;
	}

	.feedback-area {
		animation: slideIn 0.25s ease both;
	}

	@keyframes slideIn {
		from { opacity: 0; transform: translateY(-6px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.quiz-actions {
		display: flex;
		gap: 0.75rem;
		margin-top: 1rem;
		justify-content: flex-end;
	}

	.btn-retry {
		border: 1.5px solid var(--border);
		background: var(--surface);
		color: var(--muted-foreground);
		border-radius: 999px;
		padding: 0.625rem 1.25rem;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.btn-retry:hover {
		border-color: var(--primary);
		color: var(--primary);
	}

	.btn-next {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: var(--primary);
		color: white;
		border: none;
		border-radius: 999px;
		padding: 0.625rem 1.4rem;
		font-size: 0.9rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.18s ease;
		box-shadow: 0 4px 14px rgba(147, 129, 255, 0.35);
	}

	.btn-next:hover {
		background: var(--primary-hover);
		transform: translateY(-1px);
		box-shadow: 0 6px 18px rgba(147, 129, 255, 0.4);
	}

	@media (max-width: 640px) {
		.quiz-section {
			padding: 1.25rem 1rem 1rem;
		}
	}
</style>
