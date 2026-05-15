<script lang="ts">
	import { page } from '$app/state';
	import { LayoutDashboard, BookOpen, PenLine, User } from '@lucide/svelte';
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
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<nav class="fixed inset-x-0 bottom-0 z-50 flex items-stretch justify-around border-t border-border bg-card pb-[env(safe-area-inset-bottom,0.25rem)] pt-1 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden" aria-label="Mobile navigation">
	{#each navItems as item (item.label)}
		{@const active = isActive(item.href)}
		<a
			href={item.href}
			class={cn(
				"group flex flex-1 flex-col items-center justify-center gap-1 p-2 text-[0.65rem] font-medium transition-all duration-200 hover:-translate-y-px hover:text-primary",
				active ? "text-primary" : "text-muted-foreground"
			)}
			aria-current={active ? 'page' : undefined}
		>
			<span class={cn("flex items-center justify-center transition-all duration-200", active ? "rounded-[10px] bg-primary/10 px-3 py-1" : "")} aria-hidden="true">
				<item.icon size={22} class={cn("transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
			</span>
			<span class="leading-none">{item.label}</span>
		</a>
	{/each}
</nav>
