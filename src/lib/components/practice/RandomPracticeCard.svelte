<script lang="ts">
	import { Dices, Play } from '@lucide/svelte';
</script>

<div class="group relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-primary/10 via-background to-background p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/20 animate-in fade-in slide-in-from-bottom-4 ease-out fill-mode-both" style="animation-delay: 200ms;">
	<div class="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/10 blur-[2rem] transition-all duration-500 group-hover:bg-primary/20"></div>
	
	<div class="relative flex items-center justify-between gap-6 sm:gap-4">
		<div class="flex items-center gap-4">
			<div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
				<Dices size={28} />
			</div>
			<div>
				<h3 class="text-lg font-bold text-foreground">Latihan Cepat</h3>
				<p class="text-sm text-muted-foreground">5 soal acak campuran</p>
			</div>
		</div>
		
		<a href="/practice/random" class="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90">
			<Play size={16} class="fill-current" />
			<span class="hidden sm:inline">Mulai</span>
		</a>
	</div>
</div>
