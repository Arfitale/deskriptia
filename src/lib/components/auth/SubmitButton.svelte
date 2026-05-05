<script lang="ts">
	import { Loader } from '@lucide/svelte';

	let { label, variant = 'default' }: { label: string; variant?: 'default' | 'secondary' } =
		$props();

	let loading = $state(false);

	function handleClick() {
		if (loading) return;
		loading = true;
		// Replace with your real async action
		setTimeout(() => {
			loading = false;
		}, 2000);
	}
</script>

<button
	onclick={handleClick}
	disabled={loading}
	class="
    relative inline-flex h-11 w-full items-center justify-center gap-2
    rounded-lg px-4 text-sm font-semibold tracking-wide
    transition-all duration-300
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none
    active:scale-[0.98]
    disabled:pointer-events-none
    {variant === 'default'
		? 'bg-primary text-primary-foreground shadow-[0_8px_30px_hsl(var(--primary)/0.35)] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_12px_40px_hsl(var(--primary)/0.5)]'
		: 'bg-[#e94590] text-white shadow-[0_8px_30px_rgba(233,69,144,0.35)] hover:-translate-y-0.5 hover:bg-[#d63a80] hover:shadow-[0_12px_40px_rgba(233,69,144,0.5)]'}
    {loading ? 'opacity-80' : ''}
  "
>
	{#if loading}
		<Loader size={16} class="animate-spin" />
		<span>Memproses...</span>
	{:else}
		<span>{label}</span>
	{/if}
</button>
