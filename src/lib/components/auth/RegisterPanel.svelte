<script lang="ts">
	import FormInput from './FormInput.svelte';
	import SocialLogin from './SocialLogin.svelte';
	import SubmitButton from './SubmitButton.svelte';
	import { User, Mail, KeyRound, ShieldCheck, Rocket } from '@lucide/svelte';
	import type { ActionData } from '../../../routes/auth/$types'; // adjust path
	import { enhance } from '$app/forms';

	let { isLogin, onToggle, form }: { isLogin: boolean; onToggle: () => void; form: ActionData } =
		$props();

	let isLoading = $state(false);
	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirm = $state('');
</script>

<div
	class="
  z-2 flex flex-1 flex-col items-center justify-center px-8 py-12
  transition-all duration-600
  {!isLogin ? 'blur-0 scale-100 opacity-100' : 'scale-[0.97] opacity-20 blur-sm'}
  {isLogin ? 'hidden md:flex' : 'flex'}
"
>
	<div class="mb-8 text-center">
		<div
			class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e94590] text-white shadow-[0_8px_25px_rgba(233,69,144,0.4)]"
		>
			<Rocket size={22} />
		</div>
		<h2 class="mb-1 text-2xl font-bold text-foreground">Buat Akun</h2>
		<p class="text-sm text-muted-foreground">Mulai petualanganmu bersama kami</p>
	</div>

	<form
		class="w-full max-w-75 space-y-3.5"
		method="POST"
		action="?/signUpEmail"
		use:enhance={() => {
			isLoading = true; // ← set loading BEFORE submit

			return async ({ update }) => {
				await update();
				isLoading = false; // ← unset AFTER response
			};
		}}
	>
		<FormInput
			type="text"
			label="Nama Lengkap"
			placeholder="Budi Santoso"
			Icon={User}
			name="name"
			bind:value={name}
		/>
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

		<SubmitButton label="Buat Akun" variant="secondary" {isLoading} />
		{#if form?.message && form?.action === 'register'}
			<p class="text-sm text-red-500">{form.message}</p>
		{/if}
		<SocialLogin label="atau daftar dengan" />
	</form>

	<p class="mt-6 text-sm text-muted-foreground md:hidden">
		Sudah punya akun?
		<button onclick={onToggle} class="cursor-pointer font-semibold text-primary hover:underline"
			>Masuk</button
		>
	</p>
</div>
