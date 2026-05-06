<script lang="ts">
	import type { ActionData } from './$types';
	import AuthPage from '$lib/components/auth/AuthPage.svelte';
	let { form }: { form: ActionData } = $props();
</script>

<AuthPage {form} />
