<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		void goto('/dashboard');
	});
</script>

<p class="p-6 text-sm text-[#6B7280]">Redirecting to dashboard...</p>
