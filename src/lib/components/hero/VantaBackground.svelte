<script lang="ts">
	import type { VantaEffect, VantaNetOptions } from '$lib/types/vanta';

	interface Props {
		color?: number;
		backgroundColor?: number;
		maxDistance?: number;
		points?: number;
		spacing?: number;
		scale?: number;
		scaleMobile?: number;
		mouseControls?: boolean;
		touchControls?: boolean;
		gyroControls?: boolean;
		onready?: (effect: VantaEffect) => void;
		children?: import('svelte').Snippet;
	}

	let {
		color = $bindable(0x9381ff),
		backgroundColor = $bindable(0xffffff),
		maxDistance = $bindable(15),
		points = $bindable(5),
		spacing = $bindable(35),
		scale = 1,
		scaleMobile = 1,
		mouseControls = true,
		touchControls = true,
		gyroControls = false,
		onready,
		children
	}: Props = $props();

	let containerEl = $state<HTMLDivElement | undefined>(undefined);
	let vantaEffect = $state<VantaEffect | null>(null);

	function getOptions(): VantaNetOptions {
		return {
			el: containerEl!,
			mouseControls,
			touchControls,
			gyroControls,
			color,
			backgroundColor,
			maxDistance,
			points,
			spacing,
			scale,
			scaleMobile
		};
	}

	function loadScript(src: string): Promise<void> {
		return new Promise((resolve, reject) => {
			if (document.querySelector(`script[src="${src}"]`)) {
				resolve();
				return;
			}
			const s = document.createElement('script');
			s.src = src;
			s.onload = () => resolve();
			s.onerror = reject;
			document.head.appendChild(s);
		});
	}

	// Mount + teardown
	$effect(() => {
		let destroyed = false;

		(async () => {
			try {
				await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
				await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js');
				if (destroyed || !containerEl) return;
				vantaEffect = window.VANTA.NET(getOptions());
				onready?.(vantaEffect);
			} catch (err) {
				console.error('[VantaBackground] Failed to load scripts:', err);
			}
		})();

		return () => {
			destroyed = true;
			vantaEffect?.destroy();
			vantaEffect = null;
		};
	});

	// Sync reactive props into the running effect without re-initialising
	$effect(() => {
		if (!vantaEffect) return;
		vantaEffect.setOptions({ color, backgroundColor, maxDistance, points, spacing });
	});

	export function randomizeColor(): void {
		color = Math.round(Math.random() * 0xffffff);
	}

	export function getEffect(): VantaEffect | null {
		return vantaEffect;
	}
</script>

<div bind:this={containerEl} class="bg- fixed inset-0 z-[-100] size-full" aria-hidden="true">
	{@render children?.()}
</div>
