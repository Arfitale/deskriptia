<script lang="ts">
	import { page } from '$app/stores';
	import { LayoutDashboard, BookOpen, PenLine, User } from '@lucide/svelte';

	const navItems = [
		{
			label: 'Dashboard',
			href: '/dashboard',
			icon: LayoutDashboard
		},
		{
			label: 'Learn',
			href: '/learn',
			icon: BookOpen
		},
		{
			label: 'Practice',
			href: '/practice',
			icon: PenLine
		},
		{
			label: 'Profile',
			href: '/profile',
			icon: User
		}
	];

	function isActive(href: string): boolean {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}
</script>

<nav class="bottom-nav" aria-label="Mobile navigation">
	{#each navItems as item (item.label)}
		{@const active = isActive(item.href)}
		<a
			href={item.href}
			class="bottom-nav-item"
			class:active
			aria-current={active ? 'page' : undefined}
		>
			<span class="bottom-icon" aria-hidden="true">
				<item.icon size={22} />
			</span>
			<span class="bottom-label">{item.label}</span>
		</a>
	{/each}
</nav>

<style>
	.bottom-nav {
		display: none;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 50;
		background: var(--surface);
		border-top: 1px solid var(--border);
		padding: 0.25rem 0 env(safe-area-inset-bottom, 0.25rem);
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.06);
	}

	@media (max-width: 768px) {
		.bottom-nav {
			display: flex;
			justify-content: space-around;
			align-items: stretch;
		}
	}

	.bottom-nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
		flex: 1;
		padding: 0.5rem 0.25rem;
		text-decoration: none;
		color: #718096;
		font-size: 0.65rem;
		font-weight: 500;
		transition:
			color 0.18s ease,
			transform 0.15s ease;
	}

	.bottom-nav-item:hover {
		color: var(--primary);
		transform: translateY(-1px);
	}

	.bottom-nav-item.active {
		color: var(--primary);
	}

	.bottom-nav-item.active .bottom-icon {
		background: var(--primary-soft);
		border-radius: 10px;
		padding: 0.25rem 0.75rem;
	}

	.bottom-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background 0.18s ease,
			padding 0.18s ease,
			border-radius 0.18s ease;
	}

	.bottom-label {
		line-height: 1;
	}
</style>
