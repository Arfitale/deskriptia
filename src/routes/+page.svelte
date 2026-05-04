<script lang="ts">
	import Footer from '$lib/components/global/Footer.svelte';
	import HeroBadge from '$lib/components/hero/HeroBadge.svelte';
	import HeroStats from '$lib/components/hero/HeroStats.svelte';
	import HeroImage from '$lib/components/hero/HeroImage.svelte';
	import { Button } from '$lib/components/ui/button';
	import heroImage from '$lib/assets/hero.png';
	import { ArrowRight } from '@lucide/svelte';
	import Typewriter from '$lib/components/global/Typewriter.svelte';
</script>

<svelte:head>
	<title>Deskriptia | Belajar Teks Deskripsi</title>
</svelte:head>

<div class="bg-background flex min-h-svh flex-col">
	<main class="relative flex flex-1 items-center overflow-hidden px-6 py-20 md:px-12">

		<!-- Background blobs -->
		<div
			class="bg-primary-soft pointer-events-none absolute -top-24 -right-20 size-96 rounded-full opacity-60 blur-[80px]"
			aria-hidden="true"
		></div>
		<div
			class="pointer-events-none absolute -bottom-16 -left-16 size-72 rounded-full bg-blue-100 opacity-40 blur-[80px]"
			aria-hidden="true"
		></div>

		<div class="relative z-10 mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 md:flex-row md:gap-16">

			<!-- Left: Content -->
			<div class="flex flex-1 flex-col items-center gap-5 text-center md:items-start md:text-left">
				<HeroBadge label="Kelas 7 SMP · Bahasa Indonesia" />

				<h1 class="text-foreground text-4xl leading-tight font-extrabold md:text-5xl">
					Kuasai
					<span class="text-primary relative inline-block">
						Teks Deskripsi
						<span
							class="bg-primary-soft absolute bottom-1 left-0 -z-10 h-2 w-full rounded"
							aria-hidden="true"
						></span>
					</span>
					<br />dengan Cara yang
					<br/>
					<Typewriter texts={["Menyenangkan", "Efektif", "Interaktif", "Mudah Dipahami", "Bermakna"]} speed={100} deleteSpeed={50} delay={1500} />
				</h1>

				<p class="text-muted-foreground max-w-md text-base leading-relaxed">
					Pelajari cara menulis dan memahami teks deskripsi lewat materi interaktif, latihan soal,
					dan contoh-contoh nyata yang mudah dipahami.
				</p>

				<div class="flex flex-wrap items-center justify-center gap-3 md:justify-start">
					<Button
						href="/login"
						class="bg-primary hover:bg-primary-hover rounded-full px-6 py-2.5 font-bold text-white shadow-[0_4px_16px_rgba(147,129,255,0.35)] transition-transform hover:-translate-y-px"
					>
						Mulai Belajar
						<ArrowRight class="ml-1 size-4" />
					</Button>

					<Button
						variant="outline"
						href="/materi"
						class="border-border text-muted-foreground hover:border-primary hover:text-primary rounded-full px-6 py-2.5 font-semibold transition-colors"
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

	<Footer />
</div>