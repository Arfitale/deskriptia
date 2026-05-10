<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import OnboardingSlide from '$lib/components/onboarding/OnboardingSlide.svelte';
	import OnboardingProgress from '$lib/components/onboarding/OnboardingProgress.svelte';
	import OnboardingActions from '$lib/components/onboarding/OnboardingActions.svelte';
	import { Button } from '$lib/components/ui/button';
	import { BookOpen, Gamepad2, Trophy, Sparkles, ArrowRight } from '@lucide/svelte';
	import ModeToggler from '$lib/components/global/ModeToggler.svelte';

	let { data }: { data: PageData } = $props();

	const TOTAL_STEPS = 5; // welcome + 3 feature slides
	let currentStep = $state(0);
	let direction = $state<'forward' | 'backward'>('forward');

	// Form element references for programmatic submission
	let completeForm: HTMLFormElement;
	let skipForm: HTMLFormElement;

	function next() {
		if (currentStep < TOTAL_STEPS - 1) {
			direction = 'forward';
			currentStep++;
		} else {
			// Last step — submit "complete" form
			completeForm.requestSubmit();
		}
	}

	function prev() {
		if (currentStep > 0) {
			direction = 'backward';
			currentStep--;
		}
	}

	function skip() {
		skipForm.requestSubmit();
	}

	const slides = [
		{
			title: 'Materi Interaktif',
			description:
				'Jelajahi pembelajaran teks deskripsi melalui materi interaktif yang mudah dipahami dan menyenangkan.',
			iconComponent: BookOpen
		},
		{
			title: 'Latihan Seru',
			description:
				'Uji kemampuanmu melalui latihan interaktif dan dapatkan feedback langsung setelah mengerjakan.',
			iconComponent: Gamepad2
		},
		{
			title: 'Raih Pencapaian',
			description:
				'Selesaikan tantangan, kumpulkan pencapaian, dan pantau progres belajarmu selama menggunakan Deskriptia.',
			iconComponent: Trophy
		},
		{
			title: 'Siap Memulai?',
			description: 'Mari mulai perjalananmu memahami teks deskripsi bersama Deskriptia.',
			iconComponent: Sparkles
		}
	];
</script>

<svelte:head>
	<title>Selamat Datang | Deskriptia</title>
</svelte:head>

<!-- Hidden forms for server-side actions -->
<form bind:this={completeForm} method="POST" action="?/complete" use:enhance class="hidden"></form>
<form bind:this={skipForm} method="POST" action="?/skip" use:enhance class="hidden"></form>

<div
	class="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-12"
>
	<div class="absolute top-6 right-6 z-50 sm:top-8 sm:right-8">
		<ModeToggler />
	</div>

	<!-- Background decoration -->
	<div
		class="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-primary/5 blur-[100px]"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-blue-400/5 blur-[80px]"
		aria-hidden="true"
	></div>

	<!-- Content area -->
	<div class="relative z-10 flex w-full max-w-lg flex-col items-center gap-10">
		{#key currentStep}
			<!-- Step 0: Welcome Screen -->
			{#if currentStep === 0}
				<div
					class="flex animate-in flex-col items-center gap-6 text-center duration-500 fade-in-0 slide-in-from-bottom-4"
				>
					<!-- Animated logo area -->
					<div class="relative">
						<div
							class="flex size-28 items-center justify-center rounded-3xl bg-linear-to-br from-primary to-primary/70 shadow-lg shadow-primary/25 md:size-32"
						>
							<Sparkles class="size-12 text-primary-foreground md:size-14" strokeWidth={1.5} />
						</div>
						<!-- Floating ring -->
						<div class="absolute -inset-3 animate-pulse rounded-3xl border border-primary/20"></div>
					</div>

					<div class="flex flex-col gap-2">
						<h1 class="text-3xl font-extrabold text-foreground md:text-4xl">
							Selamat Datang, {data.userName}! 🎉
						</h1>
						<p class="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
							Deskriptia akan membantumu menguasai teks deskripsi dengan cara yang seru dan
							interaktif. Yuk, mulai perjalanan belajarmu!
						</p>
					</div>

					<Button
						onclick={next}
						class="mt-2 gap-2 rounded-full bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-[0_4px_20px_rgba(147,129,255,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-(--primary-hover)"
					>
						Mulai
						<ArrowRight class="size-4" />
					</Button>
				</div>

				<!-- Steps 1-3: Feature slides -->
			{:else}
				<OnboardingSlide
					title={slides[currentStep - 1].title}
					description={slides[currentStep - 1].description}
					active
				>
					{#snippet icon()}
						{@const Icon = slides[currentStep - 1].iconComponent}
						<Icon class="size-10 text-primary md:size-12" strokeWidth={1.5} />
					{/snippet}
				</OnboardingSlide>
			{/if}
		{/key}

		<!-- Progress + Actions (hidden on welcome screen) -->
		{#if currentStep > 0}
			<div class="flex w-full flex-col items-center gap-6">
				<OnboardingProgress {currentStep} totalSteps={TOTAL_STEPS} />
				<OnboardingActions
					{currentStep}
					totalSteps={TOTAL_STEPS}
					onNext={next}
					onPrev={prev}
					onSkip={skip}
				/>
			</div>
		{/if}
	</div>
</div>
