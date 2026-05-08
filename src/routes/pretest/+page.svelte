<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import {
		ClipboardCheck,
		Clock,
		CircleQuestionMark,
		ArrowRight,
		Sparkles,
		ChevronLeft,
		ChevronRight,
		CircleCheck
	} from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	let started = $state(false);
	let currentQuestion = $state(0);
	let answers = $state<(number | null)[]>([null, null, null, null, null]);
	let submitting = $state(false);

	const questions = [
		{
			prompt: 'Teks deskripsi bertujuan untuk...',
			options: [
				'Menceritakan suatu peristiwa',
				'Menggambarkan suatu objek secara rinci',
				'Menyampaikan pendapat penulis',
				'Memberikan petunjuk cara membuat sesuatu'
			],
			correct: 1
		},
		{
			prompt: 'Ciri utama teks deskripsi adalah...',
			options: [
				'Menggunakan kata kerja aktif',
				'Berisi langkah-langkah',
				'Menggambarkan objek menggunakan panca indera',
				'Menyajikan data statistik'
			],
			correct: 2
		},
		{
			prompt: 'Manakah yang merupakan kalimat deskripsi?',
			options: [
				'Hari ini cuaca sangat panas',
				'Bunganya berwarna merah muda dengan kelopak lembut yang harum semerbak',
				'Menurut saya, taman ini perlu diperbaiki',
				'Pertama, siapkan bahan-bahan berikut'
			],
			correct: 1
		},
		{
			prompt: 'Struktur teks deskripsi terdiri dari...',
			options: [
				'Orientasi - Komplikasi - Resolusi',
				'Identifikasi - Deskripsi Bagian - Simpulan',
				'Tesis - Argumentasi - Penegasan',
				'Abstrak - Orientasi - Krisis'
			],
			correct: 1
		},
		{
			prompt: 'Kata "indah", "harum", dan "lembut" termasuk jenis kata...',
			options: [
				'Kata benda (nomina)',
				'Kata kerja (verba)',
				'Kata sifat (adjektiva)',
				'Kata keterangan (adverbia)'
			],
			correct: 2
		}
	];

	let allAnswered = $derived(answers.every((a) => a !== null));
	let answeredCount = $derived(answers.filter((a) => a !== null).length);
	let progressPercent = $derived(Math.round((answeredCount / questions.length) * 100));

	function selectAnswer(questionIdx: number, optionIdx: number) {
		answers[questionIdx] = optionIdx;
	}

	function goToQuestion(idx: number) {
		currentQuestion = idx;
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

	{#if !started}
		<!-- Intro screen -->
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
					{questions.length} soal
				</div>
				<div
					class="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground"
				>
					<Clock class="size-4" />
					~5 menit
				</div>
			</div>

			<Button
				onclick={() => (started = true)}
				class="mt-2 gap-2 rounded-full bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-[0_4px_20px_rgba(147,129,255,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-(--primary-hover)"
			>
				Mulai Pre-Test
				<ArrowRight class="size-4" />
			</Button>
		</div>
	{:else}
		<!-- Test interface -->
		<div
			class="relative z-10 flex w-full max-w-2xl animate-in flex-col gap-6 duration-500 fade-in-0 slide-in-from-bottom-4"
		>
			<!-- Header -->
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Sparkles class="size-5 text-primary" />
					<h2 class="text-lg font-bold text-foreground">Pre-Test</h2>
				</div>
				<span class="text-sm text-muted-foreground">
					{answeredCount}/{questions.length} terjawab
				</span>
			</div>

			<!-- Progress bar -->
			<div class="h-2 w-full overflow-hidden rounded-full bg-muted">
				<div
					class="h-full rounded-full bg-linear-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
					style="width: {progressPercent}%"
				></div>
			</div>

			<!-- Question navigation pills -->
			<div class="flex flex-wrap justify-center gap-2">
				{#each questions as _, i}
					<button
						onclick={() => goToQuestion(i)}
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
			<!-- {#key currentQuestion}
				<Card class="animate-in border-border/50 p-6 shadow-sm duration-300 fade-in-0 md:p-8">
					<div class="flex flex-col gap-5">
						<div class="flex items-start gap-3">
							<span
								class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary"
							>
								{currentQuestion + 1}
							</span>
							<p class="pt-0.5 text-base font-medium text-foreground md:text-lg">
								{questions[currentQuestion].prompt}
							</p>
						</div>

						<div class="flex flex-col gap-3 pl-11">
							{#each questions[currentQuestion].options as option, optIdx}
								<button
									onclick={() => selectAnswer(currentQuestion, optIdx)}
									class="group flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all
										{answers[currentQuestion] === optIdx
										? 'border-primary bg-primary/5 text-foreground ring-1 ring-primary/30'
										: 'border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/50 hover:text-foreground'}"
								>
									<span
										class="flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold
											{answers[currentQuestion] === optIdx
											? 'border-primary bg-primary text-primary-foreground'
											: 'border-border text-muted-foreground group-hover:border-primary/50'}"
									>
										{String.fromCharCode(65 + optIdx)}
									</span>
									{option}
								</button>
							{/each}
						</div>
					</div>
				</Card>
			{/key} -->

			{#key currentQuestion}
				<Card class="animate-in border-border/50 p-6 shadow-sm duration-300 fade-in-0 md:p-8">
					<div class="flex flex-col gap-6">
						<!-- Question Header -->
						<div class="flex items-start gap-3">
							<span
								class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary"
							>
								{currentQuestion + 1}
							</span>
							<p class="pt-0.5 text-base font-medium text-foreground md:text-lg">
								{questions[currentQuestion].prompt}
							</p>
						</div>

						<!-- Options -->
						<div class="flex flex-col gap-2 pl-11">
							{#each questions[currentQuestion].options as option, optIdx}
								{@const isSelected = answers[currentQuestion] === optIdx}
								<button
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
					variant="ghost"
					onclick={() => goToQuestion(Math.max(0, currentQuestion - 1))}
					disabled={currentQuestion === 0}
					class="group flex items-center gap-2 px-4 text-gray-400 transition-all hover:bg-secondary hover:text-gray-100"
				>
					<ChevronLeft class="size-4 transition-transform group-hover:-translate-x-1" />
					<span>Sebelumnya</span>
				</Button>

				<!-- Next / Finish Button -->
				<div class="flex items-center">
					{#if currentQuestion < questions.length - 1}
						<Button
							variant="ghost"
							onclick={() => goToQuestion(currentQuestion + 1)}
							class="group flex items-center gap-2 px-4 text-gray-400 transition-all hover:bg-secondary hover:text-gray-100"
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
							await update();
							submitting = false;
						};
					}}
				>
					{#each answers as answer, i}
						<input type="hidden" name="answer" value={answer} />
					{/each}

					<Button
						type="submit"
						disabled={submitting}
						class="w-full gap-2 rounded-xl bg-linear-to-r from-primary to-primary/80 py-3 text-base font-bold text-primary-foreground shadow-[0_4px_20px_rgba(147,129,255,0.3)] transition-transform hover:-translate-y-0.5"
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
	{/if}
</div>
