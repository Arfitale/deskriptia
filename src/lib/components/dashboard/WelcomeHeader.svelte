<script lang="ts">
	import XPBadge from '$lib/components/ui/XPBadge.svelte';

	let {
		userName,
		level,
		totalXP,
		levelTitle
	}: { userName: string; level: number; totalXP: number; levelTitle: string } = $props();

	// Greeting based on time of day
	const hour = new Date().getHours();
	const greeting = hour < 12 ? 'Selamat pagi' : hour < 17 ? 'Selamat siang' : 'Selamat malam';
</script>

<header class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
	<div class="flex flex-col">
		<span class="mb-1 text-sm font-medium text-muted-foreground">{greeting} 👋</span>
		<h1 class="text-[1.75rem] font-extrabold tracking-tight text-foreground sm:text-3xl">
			Halo, {userName}!
		</h1>
		<p class="mt-1 text-sm text-muted-foreground">Level {level} • {levelTitle}</p>
	</div>
	<div class="flex self-start">
		<XPBadge xp={totalXP} />
	</div>
</header>
