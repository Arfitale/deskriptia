<script lang="ts">
	import FormInput from './FormInput.svelte';
	import SocialLogin from './SocialLogin.svelte';
	import SubmitButton from './SubmitButton.svelte';
	import { Mail, KeyRound } from '@lucide/svelte';
	import { LogIn } from '@lucide/svelte';
	import type { ActionData } from '../../../routes/auth/$types'; // adjust path
	import { enhance } from '$app/forms';

	let { isLogin, onToggle, form }: { isLogin: boolean; onToggle: () => void; form: ActionData } =
		$props();

	let isLoading = $state(false);
	let email = $state('');
	let password = $state('');
	let remember = $state(false);
</script>

<div
	class="
  z-2 flex flex-1 flex-col items-center justify-center px-8 py-12
  transition-all duration-600
  {isLogin ? 'blur-0 scale-100 opacity-100' : 'scale-[0.97] opacity-20 blur-sm'}
  {!isLogin ? 'hidden md:flex' : 'flex'}
"
>
	<!-- Header -->
	<div class="mb-8 text-center">
		<div
			class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_8px_25px_hsl(var(--primary)/0.4)]"
		>
			<LogIn size={22} />
		</div>
		<h2 class="mb-1 text-2xl font-bold text-foreground">Selamat Datang</h2>
		<p class="text-sm text-muted-foreground">Masuk untuk melanjutkan perjalananmu</p>
	</div>

	<form
		class="w-full max-w-75 space-y-4"
		method="POST"
		action="?/signInEmail"
		use:enhance={() => {
			isLoading = true; // ← set loading BEFORE submit

			return async ({ update }) => {
				await update();
				isLoading = false; // ← unset AFTER response
			};
		}}
	>
		<FormInput
			type="email"
			label="Email"
			placeholder="kamu@contoh.com"
			name="email"
			Icon={Mail}
			bind:value={email}
		/>
		<FormInput
			type="password"
			label="Kata Sandi"
			name="password"
			placeholder="••••••••"
			Icon={KeyRound}
			bind:value={password}
		/>

		<!-- Extras -->
		<div class="flex items-center justify-between pt-1 text-xs">
			<label class="flex cursor-pointer items-center gap-1.5 text-muted-foreground select-none">
				<input type="checkbox" bind:checked={remember} class="h-3.5 w-3.5 rounded accent-primary" />
				Ingat saya
			</label>
			<a
				href="/forgot-password"
				class="font-medium text-primary transition-colors hover:text-primary/80">Lupa kata sandi?</a
			>
		</div>
		{#if form?.message && form?.action === 'login'}
			<p class="text-sm text-red-500">{form.message}</p>
		{/if}

		<SubmitButton label="Masuk" variant="default" {isLoading} />
		<SocialLogin label="atau lanjutkan dengan" />
	</form>

	<!-- Mobile toggle -->
	<p class="mt-6 text-sm text-muted-foreground md:hidden">
		Belum punya akun?
		<button onclick={onToggle} class="cursor-pointer font-semibold text-primary hover:underline"
			>Daftar</button
		>
	</p>
</div>
