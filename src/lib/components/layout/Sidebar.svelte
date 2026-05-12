<script lang="ts">
	import { page } from '$app/stores';
	import { LayoutDashboard, BookOpen, PenLine, User } from '@lucide/svelte';
	import Logo from '../global/Logo.svelte';

	const navItems = [
		{
			label: 'Dashboard',
			href: '/dashboard',
			icon: LayoutDashboard
		},
		{
			label: 'Learn Track',
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

<aside class="sidebar" aria-label="Main navigation">
	<!-- Logo / Brand -->
	<div class="sidebar-brand">
		<a href="/dashboard" class="brand-link" aria-label="Go to dashboard">
			<Logo class="w-6" />
			<span class="brand-name">Deskriptia</span>
		</a>
	</div>

	<!-- Nav items -->
	<nav class="sidebar-nav">
		{#each navItems as item (item.label)}
			{@const active = isActive(item.href)}
			<a
				href={item.href}
				class="nav-item"
				class:active
				aria-current={active ? 'page' : undefined}
				title={item.label}
			>
				<span class="nav-icon" aria-hidden="true">
					<item.icon size={20} />
				</span>
				<span class="nav-label">{item.label}</span>
				{#if active}
					<span class="nav-indicator" aria-hidden="true"></span>
				{/if}
			</a>
		{/each}
	</nav>

	<!-- Footer hint -->
	<div class="sidebar-footer">
		<p class="footer-text">Belajar teks deskriptif<br />dengan cara yang menyenangkan.</p>
	</div>
</aside>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: 256px;
		height: 100dvh;
		background: var(--surface);
		border-right: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		z-index: 30;
		transition: width 0.25s ease;
	}

	/* ── Brand ── */
	.sidebar-brand {
		padding: 1.5rem 1.25rem 1rem;
		border-bottom: 1px solid var(--border);
	}

	.brand-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
	}

	.brand-icon {
		width: 36px;
		height: 36px;
		background: linear-gradient(135deg, var(--primary), var(--primary-hover));
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 800;
		font-size: 1.1rem;
		flex-shrink: 0;
		box-shadow: 0 2px 8px color-mix(in srgb, var(--primary) 30%, transparent);
	}

	.brand-name {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--text);
		letter-spacing: -0.01em;
	}

	/* ── Nav ── */
	.sidebar-nav {
		flex: 1;
		padding: 1rem 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		overflow-y: auto;
	}

	.nav-item {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.65rem 0.875rem;
		border-radius: 12px;
		text-decoration: none;
		color: #718096;
		font-size: 0.9rem;
		font-weight: 500;
		transition:
			background 0.18s ease,
			color 0.18s ease,
			transform 0.15s ease;
		cursor: pointer;
	}

	.nav-item:hover {
		background: var(--primary-soft);
		color: var(--primary);
		transform: translateX(2px);
	}

	.nav-item.active {
		background: var(--primary-soft);
		color: var(--primary);
		font-weight: 600;
	}

	.nav-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.nav-label {
		flex: 1;
	}

	.nav-indicator {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 60%;
		background: var(--primary);
		border-radius: 99px 0 0 99px;
	}

	/* ── Footer ── */
	.sidebar-footer {
		padding: 1rem 1.25rem 1.5rem;
		border-top: 1px solid var(--border);
	}

	.footer-text {
		font-size: 0.75rem;
		line-height: 1.5;
		color: #718096;
	}

	/* ── Collapsed (tablet) ── */
	@media (max-width: 1024px) {
		.sidebar {
			width: 72px;
		}

		.brand-name,
		.nav-label,
		.sidebar-footer {
			display: none;
		}

		.brand-link {
			justify-content: center;
		}

		.sidebar-brand {
			padding: 1.25rem 0.5rem 1rem;
		}

		.sidebar-nav {
			padding: 1rem 0.5rem;
			align-items: center;
		}

		.nav-item {
			justify-content: center;
			padding: 0.7rem;
			width: 48px;
		}

		.nav-item:hover {
			transform: none;
		}

		.nav-indicator {
			display: none;
		}
	}

	/* ── Mobile: hidden ── */
	@media (max-width: 768px) {
		.sidebar {
			display: none;
		}
	}
</style>
