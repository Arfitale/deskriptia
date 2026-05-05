<script lang="ts">
	import { enhance } from '$app/forms';
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { ActionData } from './$types';
	import AuthPage from '$lib/components/auth/AuthPage.svelte';

	let { form }: { form: ActionData } = $props();
</script>


<AuthPage/>

<!-- <main
	class="flex min-h-screen items-center justify-center bg-linear-to-b from-[#FAFAFC] to-[#F1EEFF] px-6 py-10"
>
	<Card class="w-full max-w-md p-6">
		<h1 class="mb-1 text-2xl font-bold text-[#1F2937]">Deskriptia</h1>
		<p class="mb-6 text-sm text-[#6B7280]">Sign in or create an account to continue.</p>

		<form method="POST" action="?/signInEmail" use:enhance class="space-y-4">
			<div>
				<label for="email" class="mb-1 block text-sm font-medium text-[#1F2937]">Email</label>
				<Input id="email" name="email" type="email" required />
			</div>
			<div>
				<label for="password" class="mb-1 block text-sm font-medium text-[#1F2937]">Password</label>
				<Input id="password" name="password" type="password" required />
			</div>
			<div>
				<label for="name" class="mb-1 block text-sm font-medium text-[#1F2937]"
					>Name (for registration)</label
				>
				<Input id="name" name="name" />
			</div>

			<div class="flex gap-2">
				<Button type="submit">Sign In</Button>
				<Button type="submit" formaction="?/signUpEmail" variant="secondary">Sign Up</Button>
			</div>
		</form>

		{#if form?.message}
			<p class="mt-4 text-sm text-[#FF6B6B]">{form.message}</p>
		{/if}
	</Card>
</main> -->
