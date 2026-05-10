<script lang="ts">
	import logo from "$lib/assets/logo.png"
	import { Button } from '$lib/components/ui/button';
	import ModeToggler from '$lib/components/global/ModeToggler.svelte';
	import MobileNav from './mobile-nav.svelte';
	import { Menu } from '@lucide/svelte';

	let { isAuthenticated = false }: { isAuthenticated?: boolean } = $props();

	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ label: 'Fitur', href: '#fitur' },
		{ label: 'Pembelajaran', href: '#pembelajaran' },
		{ label: 'Tentang', href: '#tentang' }
	];
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-lg"
>
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
		<!-- Left: Logo + App Name -->
		<a
			href="/"
			class="flex items-center gap-2.5 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-lg"
			aria-label="Deskriptia — Beranda"
		>
			<img src={logo} alt="" class="size-7" aria-hidden="true" />
			<span class="text-lg font-bold tracking-tight text-foreground">Deskriptia</span>
		</a>

		<!-- Center: Desktop navigation -->
		<nav class="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
			{#each navLinks as link}
				<a
					href={link.href}
					class="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Right: Auth + Theme + Mobile toggle -->
		<div class="flex items-center gap-2">
			<!-- Desktop auth buttons -->
			<div class="hidden items-center gap-2 md:flex">
				{#if isAuthenticated}
					<Button
						href="/dashboard"
						size="sm"
						class="rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md"
					>
						Dashboard
					</Button>
				{:else}
					<Button
						href="/auth"
						variant="ghost"
						size="sm"
						class="rounded-full px-4 font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						Masuk
					</Button>
					<Button
						href="/auth"
						size="sm"
						class="rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md"
					>
						Daftar
					</Button>
				{/if}
			</div>

			<ModeToggler />

			<!-- Mobile hamburger -->
			<button
				onclick={() => (mobileMenuOpen = true)}
				class="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden"
				aria-label="Buka menu navigasi"
				aria-expanded={mobileMenuOpen}
			>
				<Menu class="size-5" />
			</button>
		</div>
	</div>
</header>

<!-- Mobile navigation drawer -->
<MobileNav bind:open={mobileMenuOpen} {isAuthenticated} onclose={() => (mobileMenuOpen = false)} />
