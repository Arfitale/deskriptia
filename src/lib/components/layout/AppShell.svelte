<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import AppBottomNav from './AppBottomNav.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-dvh bg-background">
	<!-- Desktop sidebar -->
	<Sidebar />

	<!-- Main content area -->
	<main class="flex min-h-dvh flex-1 flex-col pb-20 md:ml-[72px] lg:ml-64 lg:[&.collapsed]:ml-[72px]">
		<div class="w-full flex-1 p-5 md:p-8">
			{@render children()}
		</div>
	</main>

	<!-- Mobile bottom navigation -->
	<AppBottomNav />
</div>
