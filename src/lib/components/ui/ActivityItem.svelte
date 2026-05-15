<script lang="ts">
	import { CircleCheck, Zap, LockOpen } from '@lucide/svelte';

	let {
		title,
		time,
		type
	}: {
		title: string;
		time: string;
		type: 'complete' | 'xp' | 'unlock';
	} = $props();
</script>

<div class="relative">
	<div class="absolute left-[-29px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-card ring-4 ring-card">
		{#if type === 'complete'}
			<CircleCheck size={16} class="text-emerald-500" />
		{:else if type === 'xp'}
			<Zap size={16} class="text-amber-500" />
		{:else}
			<LockOpen size={16} class="text-primary" />
		{/if}
	</div>
	<div class="flex flex-col -mt-0.5">
		<span class="text-sm font-semibold text-foreground">{title}</span>
		<span class="mt-0.5 text-xs text-muted-foreground">{time}</span>
	</div>
</div>
