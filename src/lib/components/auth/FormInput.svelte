<script lang="ts">
	import type { Component } from 'svelte';

	let {
		type = 'text',
		label,
		placeholder,
		Icon,
		name = '',
		value = $bindable('')
	}: {
		type?: string;
		label: string;
		placeholder: string;
		Icon: Component;
		value?: string;
		name?: string;
	} = $props();

	let focused = $state(false);
</script>

<div class="space-y-1.5">
	<!-- shadcn Label -->
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
		{label}
	</label>
	<!-- shadcn Input wrapper -->
	<div class="relative">
		<span
			class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transition-colors duration-200"
			class:text-primary={focused}
			class:text-muted-foreground={!focused}
		>
			<Icon size={15} />
		</span>
		<input
			{type}
			{placeholder}
			{name}
			required
			bind:value
			onfocus={() => (focused = true)}
			onblur={() => (focused = false)}
			class="
        flex h-10 w-full rounded-lg border border-input bg-background/50
        py-2 pr-3 pl-9 text-sm text-foreground
        ring-offset-background
        transition-all duration-200 placeholder:text-muted-foreground/50
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none
        disabled:cursor-not-allowed disabled:opacity-50
      "
		/>
	</div>
</div>
