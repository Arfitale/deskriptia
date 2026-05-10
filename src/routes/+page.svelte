<script lang="ts">
	import LandingHeader from '$lib/components/layout/landing-header.svelte';
	import LandingFooter from '$lib/components/layout/landing-footer.svelte';
	import HeroBadge from '$lib/components/hero/HeroBadge.svelte';
	import HeroStats from '$lib/components/hero/HeroStats.svelte';
	import HeroImage from '$lib/components/hero/HeroImage.svelte';
	import { Button } from '$lib/components/ui/button';
	import heroImage from '$lib/assets/hero.png';
	import { ArrowRight } from '@lucide/svelte';
	import Typewriter from '$lib/components/global/Typewriter.svelte';
	import VantaBackground from '$lib/components/hero/VantaBackground.svelte';
	import { mode } from 'mode-watcher';

	let { data } = $props();

	let vantaColor = $state(0x9381ff);
	let vantaBg = $derived(mode.current === 'dark' ? 0x0a0a0a : 0xffffff);

	let heroTypeTexts = $state([
		'Menyenangkan',
		'Fleksibel',
		'Interaktif',
		'Mudah Dipahami',
		'Bermakna'
	]);
</script>

<svelte:head>
	<title>Deskriptia | Belajar Teks Deskripsi</title>
	<meta
		name="description"
		content="Pelajari teks deskripsi Bahasa Indonesia dengan pengalaman interaktif dan menyenangkan."
	/>
</svelte:head>

<div class="flex min-h-svh flex-col bg-transparent">
	<VantaBackground
		color={vantaColor}
		backgroundColor={vantaBg}
		maxDistance={15}
		points={5}
		spacing={25}
	/>
	<LandingHeader isAuthenticated={data.isAuthenticated} />
	<main class="relative flex flex-1 items-center overflow-hidden px-6 py-20 md:px-12">
		<div
			class="relative z-10 mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 md:flex-row md:gap-16"
		>
			<!-- Left: Content -->
			<div class="flex flex-1 flex-col items-center gap-5 text-center md:items-start md:text-left">
				<HeroBadge label="Kelas 7 SMP · Bahasa Indonesia" />

				<h1 class="text-4xl leading-tight font-extrabold text-foreground md:text-5xl">
					Kuasai
					<span class="relative inline-block text-primary">
						Teks Deskripsi
						<span
							class="absolute bottom-1 left-0 -z-10 h-2 w-full rounded bg-primary-soft"
							aria-hidden="true"
						></span>
					</span>
					<br />dengan Cara yang
					<br />
					<Typewriter texts={heroTypeTexts} speed={100} deleteSpeed={50} delay={1500} />
				</h1>

				<p class="max-w-md text-base leading-relaxed text-muted-foreground">
					Pelajari cara menulis dan memahami teks deskripsi lewat materi interaktif, latihan soal,
					dan contoh-contoh nyata yang mudah dipahami.
				</p>

				<div class="flex flex-wrap items-center justify-center gap-3 md:justify-start">
					<Button
						href="/auth"
						class="rounded-full bg-primary px-6 py-2.5 font-bold text-white shadow-[0_4px_16px_rgba(147,129,255,0.35)] transition-transform hover:-translate-y-px hover:bg-primary-hover"
					>
						Mulai Belajar
						<ArrowRight class="ml-1 size-4" />
					</Button>

					<Button
						variant="outline"
						href="/materi"
						class="rounded-full border-border px-6 py-2.5 font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
					>
						Lihat Materi
					</Button>
				</div>

				<HeroStats />
			</div>

			<!-- Right: Image -->
			<HeroImage src={heroImage} alt="Ilustrasi belajar teks deskripsi" />
		</div>
	</main>

	<LandingFooter />
</div>
