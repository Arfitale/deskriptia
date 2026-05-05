<script lang="ts">
	let { label }: { label: string } = $props();

	const providers = [
		{ title: 'Google', icon: 'G' },
		{ title: 'Apple', icon: '⌘' },
		{ title: 'GitHub', icon: '⌨' }
	];
</script>

<div class="w-full space-y-4">
	<div class="flex items-center gap-3 text-xs text-muted-foreground/60">
		<span class="h-px flex-1 bg-border/60"></span>
		{label}
		<span class="h-px flex-1 bg-border/60"></span>
	</div>
	<div class="flex justify-center gap-3">
		{#each providers as p, index (index)}
			<button
				title={p.title}
				class="
          flex h-11 w-11 items-center justify-center rounded-lg
          border border-border/60
          bg-background/40 text-base text-muted-foreground
          transition-all duration-200
          hover:-translate-y-0.5 hover:border-border hover:bg-accent hover:text-foreground
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none
        ">{p.icon}</button
			>
		{/each}
	</div>
</div>
