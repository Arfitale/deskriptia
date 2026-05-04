<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';

	interface Props {
		src: string;
		alt: string;
	}

	let { src, alt }: Props = $props();
</script>

<div class="relative flex w-full max-w-sm flex-1 justify-center md:max-w-md">
	<!-- Image card -->
	<div class="border-border bg-surface w-full rounded-3xl border-1.5 p-5 shadow-[0_8px_40px_rgba(147,129,255,0.1)]">
		<img {src} {alt} class="block h-auto w-full rounded-xl" />
	</div>

	<!-- Chip: top-left -->
	<!-- <div class="border-border bg-surface absolute -top-3 -left-4 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
		<span class="bg-success size-2 rounded-full" aria-hidden="true"></span>
		Teks Deskripsi
	</div> -->

	<!-- Chip: bottom-right -->
	<!-- <div class="border-border bg-surface absolute -right-4 -bottom-3 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
		<ArrowRight class="text-primary size-3.5" />
		Latihan Baru Tersedia
	</div> -->
</div>