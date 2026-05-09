<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { PRETEST_QUESTIONS, getPretestFeedback } from '$lib/data/pretest-questions';
	import {
		ClipboardCheck,
		Clock,
		CircleQuestionMark,
		ArrowRight,
		Sparkles,
		ChevronLeft,
		ChevronRight,
		CircleCheck,
		Trophy,
		LayoutDashboard
	} from '@lucide/svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	// --- State ---
	type Phase = 'intro' | 'quiz' | 'result';
	let phase = $state<Phase>('intro');
	let currentQuestion = $state(0);
	let answers = $state<(number | null)[]>(Array(PRETEST_QUESTIONS.length).fill(null));
	let submitting = $state(false);

	// --- Derived ---
	let allAnswered = $derived(answers.every((a) => a !== null));
	let answeredCount = $derived(answers.filter((a) => a !== null).length);
	let progressPercent = $derived(Math.round((answeredCount / PRETEST_QUESTIONS.length) * 100));

	// Result data from form action
	let resultData = $derived(
		form && 'success' in form && form.success
			? {
					score: form.score,
					correctCount: form.correctCount,
					totalQuestions: form.totalQuestions,
					feedback: getPretestFeedback(form.score)
				}
			: null
	);

	// When the form action returns successfully, switch to result phase
	$effect(() => {
		if (resultData) {
			phase = 'result';
		}
	});

	// --- Handlers ---
	function startQuiz() {
		phase = 'quiz';
	}

	function selectAnswer(questionIdx: number, optionIdx: number) {
		answers[questionIdx] = optionIdx;
	}

	function goToQuestion(idx: number) {
		currentQuestion = idx;
	}

	function goToDashboard() {
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>Pre-Test | Deskriptia</title>
</svelte:head>

<div
	class="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-12"
>
	<!-- Background decoration -->
	<div
		class="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-primary/5 blur-[100px]"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-blue-400/5 blur-[80px]"
		aria-hidden="true"
	></div>

	<!-- ==================== INTRO SCREEN ==================== -->
	{#if phase === 'intro'}
		<div
			class="relative z-10 flex w-full max-w-lg animate-in flex-col items-center gap-8 text-center duration-500 fade-in-0 slide-in-from-bottom-4"
		>
			<div class="relative">
				<div
					class="flex size-24 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400/20 to-primary/10 shadow-inner ring-1 ring-amber-400/20 md:size-28"
				>
					<ClipboardCheck class="size-10 text-amber-500 md:size-12" strokeWidth={1.5} />
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<h1 class="text-3xl font-extrabold text-foreground md:text-4xl">Pre-Test Deskriptia 📝</h1>
				<p class="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
					Sebelum mulai belajar, yuk cek dulu pemahamanmu tentang teks deskripsi. Tenang, ini bukan
					nilai rapor — hanya untuk mengukur sejauh mana pengetahuanmu saat ini!
				</p>
			</div>

			<div class="flex flex-wrap justify-center gap-4">
				<div
					class="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground"
				>
					<CircleQuestionMark class="size-4" />
					{PRETEST_QUESTIONS.length} soal
				</div>
				<div
					class="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground"
				>
					<Clock class="size-4" />
					~5 menit
				</div>
			</div>

			<Button
				type="button"
				onclick={startQuiz}
				class="mt-2 gap-2 rounded-full bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-[0_4px_20px_rgba(147,129,255,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-(--primary-hover)"
				aria-label="Mulai mengerjakan pre-test"
			>
				Mulai Pre-Test
				<ArrowRight class="size-4" />
			</Button>
		</div>

		<!-- ==================== QUIZ SCREEN ==================== -->
	{:else if phase === 'quiz'}
		<div
			class="relative z-10 flex w-full max-w-2xl animate-in flex-col gap-6 duration-500 fade-in-0 slide-in-from-bottom-4"
			role="region"
			aria-label="Pre-test soal"
		>
			<!-- Header -->
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Sparkles class="size-5 text-primary" />
					<h2 class="text-lg font-bold text-foreground">Pre-Test</h2>
				</div>
				<span class="text-sm text-muted-foreground" aria-live="polite">
					{answeredCount}/{PRETEST_QUESTIONS.length} terjawab
				</span>
			</div>

			<!-- Progress bar -->
			<div
				class="h-2 w-full overflow-hidden rounded-full bg-muted"
				role="progressbar"
				aria-valuenow={progressPercent}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label="Progres pengerjaan"
			>
				<div
					class="h-full rounded-full bg-linear-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
					style="width: {progressPercent}%"
				></div>
			</div>

			<!-- Question navigation pills -->
			<div class="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Navigasi soal">
				{#each PRETEST_QUESTIONS as question, i (i)}
					<button
						type="button"
						onclick={() => goToQuestion(i)}
						role="tab"
						aria-selected={i === currentQuestion}
						aria-label="Soal {i + 1}{answers[i] !== null ? ', sudah dijawab' : ''}"
						class="flex size-9 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-all
							{i === currentQuestion
							? 'bg-primary text-primary-foreground shadow-md'
							: answers[i] !== null
								? 'bg-primary/10 text-primary ring-1 ring-primary/20'
								: 'bg-muted text-muted-foreground hover:bg-white'}"
					>
						{#if answers[i] !== null && i !== currentQuestion}
							<CircleCheck class="size-4" />
						{:else}
							{i + 1}
						{/if}
					</button>
				{/each}
			</div>

			<Separator />

			<!-- Current question -->
			{#key currentQuestion}
				<Card
					class="animate-in border-border/50 p-6 shadow-sm duration-300 fade-in-0 md:p-8"
					role="tabpanel"
					aria-label="Soal {currentQuestion + 1}"
				>
					<div class="flex flex-col gap-6">
						<!-- Question Header -->
						<div class="flex items-start gap-3">
							<span
								class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary"
								aria-hidden="true"
							>
								{currentQuestion + 1}
							</span>
							<p
								class="pt-0.5 text-base font-medium text-foreground md:text-lg"
								id="question-{currentQuestion}"
							>
								{PRETEST_QUESTIONS[currentQuestion].prompt}
							</p>
						</div>

						<!-- Options -->
						<div
							class="flex flex-col gap-2 pl-11"
							role="radiogroup"
							aria-labelledby="question-{currentQuestion}"
						>
							{#each PRETEST_QUESTIONS[currentQuestion].options as option, optIdx (optIdx)}
								{@const isSelected = answers[currentQuestion] === optIdx}
								<button
									type="button"
									role="radio"
									aria-checked={isSelected}
									aria-label="Pilihan {String.fromCharCode(65 + optIdx)}: {option}"
									onclick={() => selectAnswer(currentQuestion, optIdx)}
									class="group relative flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-150
              {isSelected
										? 'border-primary/40 bg-primary/8 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.3)]'
										: 'border-border/60 text-muted-foreground hover:border-primary/25 hover:bg-accent/60 hover:text-foreground'}"
								>
									<!-- Letter badge -->
									<span
										class="flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-150
              {isSelected
											? 'border-primary bg-primary text-primary-foreground'
											: 'border-border/80 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary'}"
										aria-hidden="true"
									>
										{String.fromCharCode(65 + optIdx)}
									</span>

									<span class="flex-1">{option}</span>
								</button>
							{/each}
						</div>
					</div>
				</Card>
			{/key}

			<!-- Navigation -->
			<div class="mt-8 flex items-center justify-between border-t pt-6">
				<!-- Previous Button -->
				<Button
					type="button"
					variant="ghost"
					onclick={() => goToQuestion(Math.max(0, currentQuestion - 1))}
					disabled={currentQuestion === 0}
					class="group flex items-center gap-2 px-4 text-muted-foreground transition-all hover:text-foreground"
					aria-label="Soal sebelumnya"
				>
					<ChevronLeft class="size-4 transition-transform group-hover:-translate-x-1" />
					<span>Sebelumnya</span>
				</Button>

				<!-- Next Button -->
				<div class="flex items-center">
					{#if currentQuestion < PRETEST_QUESTIONS.length - 1}
						<Button
							type="button"
							variant="ghost"
							onclick={() => goToQuestion(currentQuestion + 1)}
							class="group flex items-center gap-2 px-4 text-muted-foreground transition-all hover:text-foreground"
							aria-label="Soal selanjutnya"
						>
							<span>Selanjutnya</span>
							<ChevronRight class="size-4 transition-transform group-hover:translate-x-1" />
						</Button>
					{/if}
				</div>
			</div>

			<!-- Submit -->
			{#if allAnswered}
				<form
					method="POST"
					action="?/submit"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							// Don't reset form — we need the action data for result screen
							await update({ reset: false, invalidateAll: false });
							submitting = false;
						};
					}}
					class="animate-in duration-300 fade-in-0 slide-in-from-bottom-2"
				>
					{#each answers as answer, i (i)}
						<input type="hidden" name="answer" value={answer} />
					{/each}

					<Button
						type="submit"
						disabled={submitting}
						class="w-full gap-2 rounded-xl bg-linear-to-r from-primary to-primary/80 py-3 text-base font-bold text-primary-foreground shadow-[0_4px_20px_rgba(147,129,255,0.3)] transition-transform hover:-translate-y-0.5"
						aria-label="Kirim semua jawaban pre-test"
					>
						{#if submitting}
							Mengirim...
						{:else}
							Kirim Jawaban
							<CircleCheck class="size-4" />
						{/if}
					</Button>
				</form>
			{/if}
		</div>

		<!-- ==================== RESULT SCREEN ==================== -->
	{:else if phase === 'result' && resultData}
		<div
			class="relative z-10 flex w-full max-w-lg animate-in flex-col items-center gap-8 text-center duration-700 fade-in-0 slide-in-from-bottom-6"
			role="region"
			aria-label="Hasil pre-test"
		>
			<!-- Trophy icon -->
			<div class="relative">
				<div
					class="flex size-28 items-center justify-center rounded-3xl bg-linear-to-br from-amber-400/20 to-primary/15 shadow-lg ring-1 shadow-amber-500/10 ring-amber-400/15 md:size-32"
				>
					<Trophy class="size-12 text-amber-500 md:size-14" strokeWidth={1.5} />
				</div>
				<!-- Floating ring -->
				<div class="absolute -inset-3 animate-pulse rounded-3xl border border-amber-400/15"></div>
			</div>

			<!-- Score display -->
			<div class="flex flex-col gap-3">
				<p class="text-lg text-muted-foreground">Skor Awalmu</p>
				<p class="text-6xl font-extrabold text-foreground md:text-7xl">
					{resultData.score}
				</p>
				<p class="text-sm text-muted-foreground">
					{resultData.correctCount} dari {resultData.totalQuestions} soal benar
				</p>
			</div>

			<Separator class="max-w-xs" />

			<!-- Feedback -->
			<div class="flex max-w-md flex-col gap-2">
				<p class="text-2xl font-bold text-foreground">
					{resultData.feedback.emoji}
					{resultData.feedback.title}
				</p>
				<p class="text-base leading-relaxed text-muted-foreground">
					{resultData.feedback.message}
				</p>
			</div>

			<!-- CTA -->
			<Button
				type="button"
				onclick={goToDashboard}
				class="mt-2 gap-2 rounded-full bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-[0_4px_20px_rgba(147,129,255,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-(--primary-hover)"
				aria-label="Lanjut ke halaman dashboard"
			>
				<LayoutDashboard class="size-4" />
				Masuk Dashboard
			</Button>
		</div>
	{/if}
</div>
