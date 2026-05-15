<script lang="ts">
	import { page } from '$app/stores';
	import { LayoutDashboard, BookOpen, PenLine, User } from '@lucide/svelte';
	import Logo from '../global/Logo.svelte';
	import { cn } from '$lib/utils';

	const navItems = [
		{
			label: 'Dasbor',
			href: '/dashboard',
			icon: LayoutDashboard
		},
		{
			label: 'Belajar',
			href: '/learn',
			icon: BookOpen
		},
		{
			label: 'Latihan',
			href: '/practice',
			icon: PenLine
		},
		{
			label: 'Profil',
			href: '/profile',
			icon: User
		}
	];

	function isActive(href: string): boolean {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}
</script>

<aside
	class="fixed inset-y-0 left-0 z-30 hidden flex-col overflow-hidden border-r border-border bg-card transition-all duration-300 md:flex md:w-[72px] lg:w-64 lg:[&.collapsed]:w-[72px]"
	aria-label="Main navigation"
>
	<!-- Logo / Brand -->
	<div class="border-b border-border/60 p-6 pt-6 pb-4">
		<a
			href="/dashboard"
			class="flex items-center gap-3 lg:justify-start"
			aria-label="Go to dashboard"
		>
			<Logo class="w-7 shrink-0" />
			<span class="hidden text-lg font-bold tracking-tight text-foreground lg:block"
				>Deskriptia</span
			>
		</a>
	</div>

	<!-- Nav items -->
	<nav
		class="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 py-4 md:items-center lg:items-stretch overflow-hidden"
	>
		{#each navItems as item (item.label)}
			{@const active = isActive(item.href)}
			<a
				href={item.href}
				class={cn(
					'group relative flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:outline-none md:w-12 md:justify-center md:p-3 lg:w-auto lg:justify-start lg:px-3.5',
					active
						? 'bg-primary/8 font-semibold text-primary shadow-sm'
						: 'font-medium text-muted-foreground hover:bg-muted hover:text-foreground lg:hover:translate-x-1'
				)}
				aria-current={active ? 'page' : undefined}
				title={item.label}
			>
				<span class="flex shrink-0 items-center">
					<item.icon
						size={20}
						class={cn(
							'transition-colors duration-200',
							active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
						)}
					/>
				</span>
				<span class="hidden flex-1 lg:block">{item.label}</span>
			</a>
		{/each}
	</nav>

	<!-- Footer hint -->
	<div class="hidden border-t border-border/60 p-5 xl:block">
		<p class="text-xs leading-relaxed text-muted-foreground">
			Belajar teks deskriptif<br />dengan cara menyenangkan.
		</p>
	</div>
</aside>
