<script lang="ts">
	import FormInput from './FormInput.svelte';
	import SocialLogin from './SocialLogin.svelte';
	import SubmitButton from './SubmitButton.svelte';
	import { User, Mail, KeyRound, ShieldCheck, Rocket } from '@lucide/svelte';

	let { isLogin, onToggle }: { isLogin: boolean; onToggle: () => void } = $props();

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

	<div class="w-full max-w-75 space-y-3.5">
		<FormInput
			type="text"
			label="Nama Lengkap"
			placeholder="Budi Santoso"
			Icon={User}
			bind:value={name}
		/>
		<FormInput
			type="email"
			label="Email"
			placeholder="kamu@contoh.com"
			Icon={Mail}
			bind:value={email}
		/>
		<FormInput
			type="password"
			label="Kata Sandi"
			placeholder="••••••••"
			Icon={KeyRound}
			bind:value={password}
		/>
		<FormInput
			type="password"
			label="Konfirmasi Kata Sandi"
			placeholder="••••••••"
			Icon={ShieldCheck}
			bind:value={confirm}
		/>

		<SubmitButton label="Buat Akun" variant="secondary" />
		<SocialLogin label="atau daftar dengan" />
	</div>

	<p class="mt-6 text-sm text-muted-foreground md:hidden">
		Sudah punya akun?
		<button onclick={onToggle} class="font-semibold text-primary hover:underline">Masuk</button>
	</p>
</div>
