<script lang="ts">
	import LessonLayout from '$lib/components/lesson/LessonLayout.svelte';
	import LessonHeader from '$lib/components/lesson/LessonHeader.svelte';
	import LessonContent from '$lib/components/lesson/LessonContent.svelte';
	import ExampleCard from '$lib/components/lesson/ExampleCard.svelte';
	import InteractionBlock from '$lib/components/lesson/InteractionBlock.svelte';
	import QuizCard from '$lib/components/lesson/QuizCard.svelte';
	import CompletionScreen from '$lib/components/lesson/CompletionScreen.svelte';
	import { progressionStore } from '$lib/stores/progressionStore.svelte';
	import type { PageData } from './$types';

	// Steps: 0=intro, 1=micro, 2=example, 3=interaction, 4=quiz, 5=completion
	type Step = 0 | 1 | 2 | 3 | 4 | 5;

	let { data }: { data: PageData } = $props();
	const lesson = data.lesson;

	let step = $state<Step>(0);
	let completionSaved = $state(false);
	let earnedXP = $state(0);
	let leveledUp = $state(false);

	function goNext() {
		if (step < 5) step = (step + 1) as Step;
	}

	function restartLesson() {
		step = 0;
	}

	// Header step = steps 1–5 map to lesson content steps
	const headerStep = $derived(step === 0 ? 0 : step);

	// Save progress when reaching completion step
	$effect(() => {
		if (step === 5 && !completionSaved) {
			saveCompletion();
		}
	});

	async function saveCompletion() {
		try {
			const res = await fetch('/api/progress/complete', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ nodeId: lesson.id })
			});

			if (res.ok) {
				const result = await res.json();
				earnedXP = result.xpEarned;
				leveledUp = result.leveledUp;
				completionSaved = true;

				// Update local store
				progressionStore.completeLesson(
					lesson.id,
					result.xpEarned,
					result.nextNodeId
				);
			}
		} catch (err) {
			console.error('Failed to save lesson completion:', err);
			// Still show completion — will sync on next load
			completionSaved = true;
			earnedXP = lesson.xpReward;
		}
	}
</script>

<svelte:head>
	<title>{lesson.title} — Deskriptia</title>
	<meta
		name="description"
		content="Pelajari {lesson.title} secara interaktif di Deskriptia."
	/>
</svelte:head>

<LessonLayout>
	<!-- ─── Header (always visible except on completion) ─── -->
	{#if step < 5}
		<LessonHeader
			title={lesson.title}
			chapterLabel={lesson.chapterLabel}
			chapterNumber={lesson.chapterNumber}
			xpReward={lesson.xpReward}
			durationMinutes={lesson.durationMinutes}
			currentStep={headerStep}
			totalSteps={lesson.totalSteps}
		/>
	{/if}

	<!-- ─── Step 0: Intro ─── -->
	{#if step === 0}
		<div class="intro-screen animate-in">
			<div class="intro-icon">{lesson.intro.icon}</div>
			<h1 class="intro-heading">{@html lesson.intro.heading.replace('\n', '<br />')}</h1>
			<p class="intro-sub">{lesson.intro.subtext}</p>

			<!-- Stats chips -->
			<div class="intro-chips">
				<span class="chip">📚 {lesson.chapterLabel}</span>
				<span class="chip">⏱️ {lesson.durationMinutes} menit</span>
				<span class="chip chip-xp">⚡ +{lesson.xpReward} XP</span>
			</div>

			<button class="btn-start" onclick={goNext}>
				Mulai Belajar →
			</button>
		</div>

	<!-- ─── Step 1: Micro Lesson ─── -->
	{:else if step === 1}
		<div class="step-wrapper">
			<LessonContent title={lesson.microLesson.title} blocks={lesson.microLesson.blocks} />
			<div class="bottom-nav">
				<button class="btn-continue" onclick={goNext}>Lihat Contoh →</button>
			</div>
		</div>

	<!-- ─── Step 2: Example ─── -->
	{:else if step === 2}
		<div class="step-wrapper">
			<ExampleCard segments={lesson.examples} />
			<div class="bottom-nav">
				<button class="btn-continue" onclick={goNext}>Coba Sendiri →</button>
			</div>
		</div>

	<!-- ─── Step 3: Interaction ─── -->
	{:else if step === 3}
		<div class="step-wrapper">
			<InteractionBlock interaction={lesson.interaction} oncomplete={goNext} />
		</div>

	<!-- ─── Step 4: Quiz ─── -->
	{:else if step === 4}
		<div class="step-wrapper">
			<QuizCard questions={lesson.quiz} oncomplete={goNext} />
		</div>

	<!-- ─── Step 5: Completion ─── -->
	{:else if step === 5}
		<CompletionScreen
			lessonTitle={lesson.title}
			xpEarned={earnedXP || lesson.xpReward}
			nextLesson={lesson.nextLesson}
			onrestart={restartLesson}
			{leveledUp}
		/>
	{/if}
</LessonLayout>

<style>
	/* ─── Intro ─── */
	.intro-screen {
		min-height: calc(100dvh - 4rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 3rem 1.5rem;
		gap: 1.25rem;
	}

	.animate-in {
		animation: fadeSlideUp 0.45s ease both;
	}

	@keyframes fadeSlideUp {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.intro-icon {
		font-size: 4rem;
		animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
	}

	@keyframes pop {
		from { transform: scale(0.4) rotate(-10deg); opacity: 0; }
		to { transform: scale(1) rotate(0deg); opacity: 1; }
	}

	.intro-heading {
		font-size: clamp(1.5rem, 5vw, 2.25rem);
		font-weight: 900;
		line-height: 1.25;
		color: var(--foreground);
		margin: 0;
		white-space: pre-line;
	}

	.intro-sub {
		font-size: 0.95rem;
		color: var(--muted-foreground);
		line-height: 1.7;
		max-width: 400px;
		margin: 0;
	}

	.intro-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		background: var(--muted);
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: 0.3rem 0.85rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--muted-foreground);
	}

	.chip-xp {
		background: linear-gradient(135deg, #fef3c7, #fde68a);
		border-color: #fcd34d;
		color: #b45309;
	}

	.btn-start {
		background: var(--primary);
		color: white;
		border: none;
		border-radius: 999px;
		padding: 0.875rem 2.25rem;
		font-size: 1rem;
		font-weight: 800;
		cursor: pointer;
		transition: all 0.18s ease;
		box-shadow: 0 6px 20px rgba(147, 129, 255, 0.4);
		margin-top: 0.5rem;
	}

	.btn-start:hover {
		background: var(--primary-hover);
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(147, 129, 255, 0.5);
	}

	/* ─── Step wrapper ─── */
	.step-wrapper {
		display: flex;
		flex-direction: column;
	}

	/* ─── Bottom nav ─── */
	.bottom-nav {
		padding: 1.25rem 1.25rem 2rem;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--border);
	}

	.btn-continue {
		background: var(--primary);
		color: white;
		border: none;
		border-radius: 999px;
		padding: 0.75rem 1.75rem;
		font-size: 0.9rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.18s ease;
		box-shadow: 0 4px 14px rgba(147, 129, 255, 0.35);
	}

	.btn-continue:hover {
		background: var(--primary-hover);
		transform: translateY(-1px);
		box-shadow: 0 6px 18px rgba(147, 129, 255, 0.42);
	}

	@media (max-width: 640px) {
		.bottom-nav {
			padding: 1rem 1rem 1.5rem;
		}

		.intro-screen {
			padding: 2rem 1.25rem;
		}
	}
</style>
