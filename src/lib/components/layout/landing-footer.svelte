<script lang="ts">
	import logo from '$lib/assets/logo.png';
</script>

<footer class="w-full border-t border-border/40">
	<div
		class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row md:gap-4 md:px-6"
	>
		<!-- Left: Brand -->
		<div class="flex flex-col items-center gap-2 md:items-start">
			<div class="flex items-center gap-2">
				<img src={logo} alt="" class="size-5" aria-hidden="true" />
				<span class="text-sm font-bold text-foreground">Deskriptia</span>
			</div>
			<p class="max-w-xs text-center text-xs leading-relaxed text-muted-foreground md:text-left">
				Belajar teks deskripsi dengan pengalaman interaktif.
			</p>
		</div>

		<!-- Right: Copyright -->
		<div class="flex flex-col items-center gap-1 md:items-end">
			<p class="text-xs text-muted-foreground">© 2026 Deskriptia</p>
			<p class="text-xs text-muted-foreground/60">
				Media pembelajaran interaktif Bahasa Indonesia.
			</p>
		</div>
	</div>
</footer>
