<script lang="ts">
	let { isLogin, onToggle }: { isLogin: boolean; onToggle: () => void } = $props();

	let visible = $state(true);

	function handleToggle() {
		visible = false;
		setTimeout(() => {
			onToggle();
			setTimeout(() => {
				visible = true;
			}, 50);
		}, 300);
	}

	const content = $derived(
		isLogin
			? {
					title: 'Baru di sini?',
					text: 'Bergabunglah dan nikmati berbagai fitur eksklusif. Daftarkan akunmu secara gratis sekarang!',
					btn: 'Daftar'
				}
			: {
					title: 'Sudah punya akun?',
					text: 'Masuk dan lanjutkan perjalananmu bersama kami dari mana pun kamu tinggalkan.',
					btn: 'Masuk'
				}
	);
</script>

<div
	class="pointer-events-none absolute top-0 z-5 hidden h-full w-1/2 transition-[left] duration-800 ease-[cubic-bezier(.77,0,.18,1)] md:block"
	style:left={isLogin ? '50%' : '0%'}
>
	<div
		class="
  animate-gradient-shift pointer-events-auto relative flex h-full w-full flex-col items-center justify-center bg-[linear-gradient(135deg,rgba(108,59,219,0.92)_0%,rgba(233,69,144,0.88)_50%,rgba(29,191,224,0.85)_100%)]
  bg-size-[300%_300%]
  p-10 text-center
  text-white
"
	>
		<!-- Sparkles -->
		{#each ['top-[15%] left-[20%]', 'top-[70%] left-[75%] w-[3px] h-[3px]', 'top-[40%] left-[50%] w-[5px] h-[5px]', 'top-[85%] left-[30%]', 'top-[25%] left-[80%] w-[3px] h-[3px]'] as s, i (i)}
			<span
				class="animate-sparkle absolute h-1 w-1 rounded-full bg-white/60 {s}"
				style:animation-delay="{i * 0.8}s"
			></span>
		{/each}

		<div
			class="relative z-10 flex flex-col items-center transition-all duration-300"
			class:opacity-0={!visible}
			class:translate-y-2={!visible}
		>
			<h2 class="mb-3 text-[26px] font-bold drop-shadow-md">{content.title}</h2>
			<p class="mb-7 max-w-60 text-sm leading-relaxed opacity-90">{content.text}</p>
			<button
				onclick={handleToggle}
				class="rounded-full border-2 border-white/70 bg-transparent px-8 py-2.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/15 hover:shadow-lg"
				>{content.btn}</button
			>
		</div>
	</div>
</div>

<style>
	@keyframes gradShift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
	@keyframes sparkle {
		0%,
		100% {
			opacity: 0;
			transform: translateY(0) scale(1);
		}
		50% {
			opacity: 1;
			transform: translateY(-18px) scale(1.5);
		}
	}
	:global(.animate-grad) {
		animation: gradShift 6s ease infinite;
	}
	:global(.animate-sparkle) {
		animation: sparkle 4s ease-in-out infinite;
	}
</style>
