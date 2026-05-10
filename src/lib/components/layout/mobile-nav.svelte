<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { X } from '@lucide/svelte';

	let {
		open = $bindable(false),
		isAuthenticated = false,
		onclose
	}: {
		open?: boolean;
		isAuthenticated?: boolean;
		onclose?: () => void;
	} = $props();

	const navLinks = [
		{ label: 'Fitur', href: '#fitur' },
		{ label: 'Pembelajaran', href: '#pembelajaran' },
		{ label: 'Tentang', href: '#tentang' }
	];

	function handleClose() {
		onclose?.();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') handleClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- Backdrop overlay -->
	<button
		class="fixed inset-0 z-40 cursor-default border-none bg-black/20 backdrop-blur-sm"
		transition:fade={{ duration: 200 }}
		onclick={handleClose}
		aria-label="Tutup menu navigasi"
		tabindex="-1"
	></button>

	<!-- Mobile menu panel -->
	<div
		class="fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-background/95 shadow-xl backdrop-blur-lg"
		transition:slide={{ duration: 250, axis: 'x' }}
		aria-label="Menu navigasi mobile"
		role="dialog"
		aria-modal="true"
	>
		<!-- Close button -->
		<div class="flex items-center justify-end p-4">
			<button
				onclick={handleClose}
				class="flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				aria-label="Tutup menu"
			>
				<X class="size-5" />
			</button>
		</div>

		<!-- Navigation links -->
		<div class="flex flex-1 flex-col gap-1 px-4">
			{#each navLinks as link}
				<a
					href={link.href}
					onclick={handleClose}
					class="rounded-xl px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					{link.label}
				</a>
			{/each}
		</div>

		<!-- Auth section -->
		<div class="flex flex-col gap-2 border-t border-border/40 p-4">
			{#if isAuthenticated}
				<Button
					href="/dashboard"
					class="w-full rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary-hover"
				>
					Dashboard
				</Button>
			{:else}
				<Button
					href="/auth"
					variant="outline"
					class="w-full rounded-xl border-border font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
				>
					Masuk
				</Button>
				<Button
					href="/auth"
					class="w-full rounded-xl bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary-hover"
				>
					Daftar
				</Button>
			{/if}
		</div>
	</div>
{/if}
