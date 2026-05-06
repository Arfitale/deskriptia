<script lang="ts">
	import LoginPanel from './LoginPanel.svelte';
	import RegisterPanel from './RegisterPanel.svelte';
	import GradientOverlay from './GradientOverlay.svelte';
	import type { ActionData } from '../../../routes/auth/$types'; // adjust path

	let { form }: { form: ActionData } = $props();
	let isLogin = $state(true);

	function toggle() {
		isLogin = !isLogin;
	}
</script>

<!-- Ambient blobs -->
<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div class="blob blob-one"></div>
	<div class="blob blob-two"></div>
	<div class="blob blob-three"></div>
</div>

<!-- Card -->
<main class="relative z-10 flex min-h-screen items-center justify-center p-4">
	<div
		class="
    relative flex min-h-200 w-full max-w-240
    overflow-hidden rounded-3xl
    border border-white/8
    bg-white/4
    shadow-[0_30px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[30px]
    dark:bg-white/4
  "
	>
		<!-- Desktop divider -->
		<div
			class="
      absolute top-[10%] left-1/2 z-1 hidden h-[80%] w-px
      bg-linear-to-b from-transparent via-white/8 to-transparent md:block
    "
		></div>

		<LoginPanel {isLogin} {form} onToggle={toggle} />
		<RegisterPanel {isLogin} {form} onToggle={toggle} />
		<GradientOverlay {isLogin} onToggle={toggle} />
	</div>
</main>

<style>
	:global(body) {
		font-family: 'Inter', sans-serif;
		background: #0f0f1a;
	}
	:global(.dark body) {
		background: #0f0f1a;
	}
	:global(body) {
		background: #f0f0f8;
	}

	.blob {
		position: absolute;
		border-radius: 9999px;
		filter: blur(120px);
		opacity: 0.4;
		animation: blobFloat 14s ease-in-out infinite alternate;
	}
	.blob-one {
		width: 520px;
		height: 520px;
		background: #6c3bdb;
		top: -10%;
		left: -8%;
	}
	.blob-two {
		width: 440px;
		height: 440px;
		background: #e94590;
		bottom: -12%;
		right: -6%;
		animation-delay: -5s;
	}
	.blob-three {
		width: 360px;
		height: 360px;
		background: #1dbfe0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-delay: -9s;
	}

	@keyframes blobFloat {
		0% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(30px, -40px) scale(1.08);
		}
		100% {
			transform: translate(-20px, 20px) scale(0.95);
		}
	}
</style>
