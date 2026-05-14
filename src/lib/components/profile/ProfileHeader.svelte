<script lang="ts">
	let {
		userName,
		level,
		totalXP,
		levelTitle,
		avatarText,
		joinedAt
	}: {
		userName: string;
		level: number;
		totalXP: number;
		levelTitle: string;
		avatarText: string;
		joinedAt: string;
	} = $props();
</script>

<div class="relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-primary/10 via-background to-background p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
	<div class="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-[1.2rem] bg-linear-to-br from-primary to-primary/80 text-3xl font-extrabold text-primary-foreground shadow-xl shadow-primary/20">
		{avatarText}
	</div>
	
	<h1 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
		{userName}
	</h1>
	
	<p class="mt-2 text-sm font-medium text-muted-foreground">
		Bergabung sejak {joinedAt}
	</p>
	
	<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
		<div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary backdrop-blur-sm">
			<span class="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.65rem] text-primary-foreground">
				{level}
			</span>
			{levelTitle}
		</div>
		<div class="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-sm font-bold text-amber-600 dark:text-amber-500 backdrop-blur-sm">
			✨ {totalXP} XP
		</div>
	</div>
	
	<p class="mt-6 text-sm font-medium italic text-muted-foreground/80">
		"Tetap lanjutkan perjalanan belajarmu ✨"
	</p>
	
	<!-- decorative elements -->
	<div class="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-primary/10 blur-[3.5rem]"></div>
	<div class="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-amber-500/10 blur-[3.5rem]"></div>
</div>
