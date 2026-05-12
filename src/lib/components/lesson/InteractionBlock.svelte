<script lang="ts">
	import type { Interaction } from '$lib/data/lessonData';
	import { CheckCircle, XCircle } from '@lucide/svelte';
	import FeedbackBanner from './FeedbackBanner.svelte';

	let {
		interaction,
		oncomplete
	}: {
		interaction: Interaction;
		oncomplete: () => void;
	} = $props();

	// shared state
	type AnswerState = 'idle' | 'correct' | 'incorrect';
	let answerState = $state<AnswerState>('idle');
	let selectedIdx = $state<number | null>(null);
	let matchAnswers = $state<Record<string, string>>({});
	let matchResult = $state<AnswerState>('idle');

	// ─── Identify interaction ─────────────────────────────────────────────────
	function handleIdentify(option: string, correctLabel: string) {
		if (answerState !== 'idle') return;
		const correct = option === correctLabel;
		answerState = correct ? 'correct' : 'incorrect';
	}

	// ─── Choose-structure interaction ─────────────────────────────────────────
	function handleChoose(idx: number, correctIndex: number) {
		if (answerState !== 'idle') return;
		selectedIdx = idx;
		answerState = idx === correctIndex ? 'correct' : 'incorrect';
	}

	// ─── Match interaction ────────────────────────────────────────────────────
	let activeTerm = $state<string | null>(null);

	function handleMatchTerm(term: string) {
		activeTerm = term;
	}

	function handleMatchDef(term: string, definition: string, pairs: Array<{ term: string; definition: string }>) {
		if (!activeTerm) return;
		matchAnswers = { ...matchAnswers, [activeTerm]: definition };
		activeTerm = null;
		// check if all matched
		if (Object.keys(matchAnswers).length === pairs.length) {
			const allCorrect = pairs.every((p) => matchAnswers[p.term] === p.definition);
			matchResult = allCorrect ? 'correct' : 'incorrect';
		}
	}

	function resetMatch() {
		matchAnswers = {};
		matchResult = 'idle';
		activeTerm = null;
	}

	function retryInteraction() {
		answerState = 'idle';
		selectedIdx = null;
		matchAnswers = {};
		matchResult = 'idle';
		activeTerm = null;
	}

	const isDone = $derived(
		answerState === 'correct' || matchResult === 'correct'
	);

	const isWrong = $derived(
		answerState === 'incorrect' || matchResult === 'incorrect'
	);
</script>

<section class="interaction-section animate-in">
	<div class="section-label">✨ Interaksi</div>
	<h2 class="section-title">Coba Sendiri!</h2>

	<!-- IDENTIFY -->
	{#if interaction.type === 'identify'}
		<div class="interaction-card">
			<p class="prompt">{interaction.prompt}</p>

			<blockquote class="paragraph-block">
				{interaction.paragraph}
			</blockquote>

			<div class="options-grid">
				{#each interaction.options as option}
					{@const isSelected = answerState !== 'idle' && option === interaction.options.find((o) => o === (answerState === 'correct' ? interaction.correctLabel : option))}
					{@const isCorrectOpt = option === interaction.correctLabel}
					<button
						class="option-btn"
						class:correct={answerState !== 'idle' && isCorrectOpt}
						class:incorrect={answerState === 'incorrect' && option !== interaction.correctLabel && option === interaction.options[0]}
						class:selected={answerState === 'incorrect' && !isCorrectOpt}
						disabled={answerState !== 'idle'}
						onclick={() => handleIdentify(option, interaction.correctLabel)}
					>
						{option}
					</button>
				{/each}
			</div>

			{#if isDone}
				<FeedbackBanner variant="success" message="Tepat sekali! Paragraf ini adalah bagian Identifikasi." />
			{:else if isWrong}
				<FeedbackBanner variant="error" message="Belum tepat. Coba perhatikan: bagian mana yang memperkenalkan objek secara umum?" />
			{/if}
		</div>

	<!-- CHOOSE STRUCTURE -->
	{:else if interaction.type === 'choose-structure'}
		<div class="interaction-card">
			<p class="prompt">{interaction.prompt}</p>
			<p class="question">{interaction.question}</p>

			<div class="options-list">
				{#each interaction.options as option, idx}
					<button
						class="option-item"
						class:correct={answerState !== 'idle' && idx === interaction.correctIndex}
						class:incorrect={answerState === 'incorrect' && idx === selectedIdx && idx !== interaction.correctIndex}
						disabled={answerState !== 'idle'}
						onclick={() => handleChoose(idx, interaction.correctIndex)}
					>
						<span class="option-letter">{String.fromCharCode(65 + idx)}</span>
						<span>{option}</span>
						{#if answerState !== 'idle' && idx === interaction.correctIndex}
							<CheckCircle size={16} class="ml-auto shrink-0 text-green-600" />
						{:else if answerState === 'incorrect' && idx === selectedIdx}
							<XCircle size={16} class="ml-auto shrink-0 text-red-400" />
						{/if}
					</button>
				{/each}
			</div>

			{#if isDone}
				<FeedbackBanner variant="success" message="Benar! Itulah tujuan utama teks deskripsi." />
			{:else if isWrong}
				<FeedbackBanner variant="error" message="Hmm, belum tepat. Perhatikan pilihan yang benar ya!" />
			{/if}
		</div>

	<!-- MATCH -->
	{:else if interaction.type === 'match'}
		<div class="interaction-card">
			<p class="prompt">{interaction.prompt}</p>
			<p class="match-hint">Pilih istilah, lalu pilih definisi yang cocok.</p>

			<div class="match-columns">
				<!-- Terms -->
				<div class="match-col">
					<div class="match-col-label">Istilah</div>
					{#each interaction.pairs as pair}
						<button
							class="match-chip term"
							class:active={activeTerm === pair.term}
							class:matched={matchAnswers[pair.term] !== undefined}
							onclick={() => handleMatchTerm(pair.term)}
							disabled={matchAnswers[pair.term] !== undefined || matchResult !== 'idle'}
						>
							{pair.term}
						</button>
					{/each}
				</div>

				<!-- Definitions -->
				<div class="match-col">
					<div class="match-col-label">Definisi</div>
					{#each interaction.pairs as pair}
						{@const alreadyUsed = Object.values(matchAnswers).includes(pair.definition)}
						<button
							class="match-chip def"
							class:matched={alreadyUsed}
							disabled={!activeTerm || alreadyUsed || matchResult !== 'idle'}
							onclick={() => handleMatchDef(activeTerm!, pair.definition, interaction.pairs)}
						>
							{pair.definition}
						</button>
					{/each}
				</div>
			</div>

			{#if matchResult === 'correct'}
				<FeedbackBanner variant="success" message="Pasangan lengkap! Semua benar." />
			{:else if matchResult === 'incorrect'}
				<FeedbackBanner variant="error" message="Ada yang tidak tepat. Coba lagi!" />
				<button class="retry-btn" onclick={resetMatch}>Coba Lagi</button>
			{/if}
		</div>
	{/if}

	<!-- Continue / Retry -->
	<div class="action-row">
		{#if isWrong && interaction.type !== 'match'}
			<button class="retry-btn" onclick={retryInteraction}>Coba Lagi</button>
		{/if}
		{#if isDone}
			<button class="continue-btn" onclick={oncomplete}>
				Lanjut →
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

	.interaction-section {
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
		color: #d97706;
		background: #fef3c7;
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

	.interaction-card {
		background: var(--surface);
		border: 1.5px solid var(--border);
		border-radius: 18px;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.prompt {
		font-size: 0.925rem;
		font-weight: 600;
		color: var(--foreground);
		margin: 0;
		line-height: 1.5;
	}

	.question {
		font-size: 0.875rem;
		color: var(--foreground);
		margin: 0;
		line-height: 1.6;
		background: var(--muted);
		border-radius: 10px;
		padding: 0.75rem;
	}

	.paragraph-block {
		background: var(--muted);
		border-left: 3px solid var(--primary);
		border-radius: 0 10px 10px 0;
		padding: 0.875rem 1rem;
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.75;
		color: var(--foreground);
		font-style: italic;
	}

	/* Options grid for identify */
	.options-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.625rem;
	}

	.option-btn {
		border: 1.5px solid var(--border);
		background: var(--surface);
		color: var(--foreground);
		border-radius: 10px;
		padding: 0.625rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.18s ease;
		text-align: center;
	}

	.option-btn:hover:not(:disabled) {
		border-color: var(--primary);
		color: var(--primary);
		transform: translateY(-1px);
	}

	.option-btn:disabled {
		cursor: default;
	}

	.option-btn.correct {
		border-color: #22c55e;
		background: #f0fdf4;
		color: #15803d;
		box-shadow: 0 0 0 3px #dcfce7;
	}

	.option-btn.incorrect,
	.option-btn.selected {
		border-color: #fca5a5;
		background: #fef2f2;
		color: #dc2626;
	}

	/* Options list for choose-structure */
	.options-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.option-item {
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
	}

	.option-item:hover:not(:disabled) {
		border-color: var(--primary);
		background: var(--primary-soft);
		transform: translateY(-1px);
	}

	.option-item:disabled {
		cursor: default;
	}

	.option-item.correct {
		border-color: #22c55e;
		background: #f0fdf4;
		color: #15803d;
		font-weight: 600;
		box-shadow: 0 0 0 3px #dcfce7;
	}

	.option-item.incorrect {
		border-color: #fca5a5;
		background: #fef2f2;
		color: #dc2626;
	}

	.option-letter {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		background: var(--muted);
		border-radius: 6px;
		font-size: 0.7rem;
		font-weight: 800;
		color: var(--muted-foreground);
		flex-shrink: 0;
	}

	/* Match interaction */
	.match-hint {
		font-size: 0.82rem;
		color: var(--muted-foreground);
		margin: 0;
	}

	.match-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.match-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.match-col-label {
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--muted-foreground);
		margin-bottom: 0.25rem;
	}

	.match-chip {
		border: 1.5px solid var(--border);
		background: var(--surface);
		border-radius: 10px;
		padding: 0.625rem 0.75rem;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--foreground);
		cursor: pointer;
		text-align: left;
		transition: all 0.18s ease;
		line-height: 1.4;
	}

	.match-chip:hover:not(:disabled) {
		border-color: var(--primary);
		transform: translateY(-1px);
	}

	.match-chip.active {
		border-color: var(--primary);
		background: var(--primary-soft);
		color: var(--primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
	}

	.match-chip.matched {
		border-color: #22c55e;
		background: #f0fdf4;
		color: #15803d;
		opacity: 0.7;
		cursor: default;
	}

	.match-chip:disabled:not(.matched) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Action row */
	.action-row {
		display: flex;
		gap: 0.75rem;
		margin-top: 1rem;
		justify-content: flex-end;
	}

	.retry-btn {
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

	.retry-btn:hover {
		border-color: var(--primary);
		color: var(--primary);
	}

	.continue-btn {
		background: var(--primary);
		color: white;
		border: none;
		border-radius: 999px;
		padding: 0.625rem 1.5rem;
		font-size: 0.9rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.18s ease;
		box-shadow: 0 4px 14px rgba(147, 129, 255, 0.35);
	}

	.continue-btn:hover {
		background: var(--primary-hover);
		transform: translateY(-1px);
		box-shadow: 0 6px 18px rgba(147, 129, 255, 0.4);
	}

	@media (max-width: 480px) {
		.options-grid {
			grid-template-columns: 1fr;
		}

		.match-columns {
			grid-template-columns: 1fr;
		}

		.interaction-section {
			padding: 1.25rem 1rem 1rem;
		}
	}
</style>
