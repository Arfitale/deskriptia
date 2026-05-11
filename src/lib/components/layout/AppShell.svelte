<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import AppBottomNav from './AppBottomNav.svelte';

	let { children } = $props();
</script>

<div class="app-shell">
	<!-- Desktop sidebar -->
	<Sidebar />

	<!-- Main content area -->
	<main class="app-main">
		<div class="content-wrapper">
			{@render children()}
		</div>
	</main>

	<!-- Mobile bottom navigation -->
	<AppBottomNav />
</div>

<style>
	.app-shell {
		display: flex;
		min-height: 100dvh;
		background: var(--bg);
	}

	.app-main {
		flex: 1;
		/* On desktop, sidebar takes 256px */
		margin-left: 256px;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.content-wrapper {
		flex: 1;
		padding: 2rem 2rem 2rem;
		max-width: 960px;
		width: 100%;
	}

	/* Tablet */
	@media (max-width: 1024px) {
		.app-main {
			margin-left: 72px;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.app-main {
			margin-left: 0;
			padding-bottom: 80px; /* space for bottom nav */
		}

		.content-wrapper {
			padding: 1.25rem 1rem;
		}
	}
</style>
