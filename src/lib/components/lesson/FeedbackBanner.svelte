<script lang="ts">
	type Variant = 'success' | 'error' | 'info';

	let {
		variant,
		message
	}: {
		variant: Variant;
		message: string;
	} = $props();

	const configs: Record<Variant, { icon: string; classes: string }> = {
		success: {
			icon: '✅',
			classes: 'bg-[#f0fdf4] border-[#86efac] text-[#15803d]'
		},
		error: {
			icon: '❌',
			classes: 'bg-[#fef2f2] border-[#fca5a5] text-[#b91c1c]'
		},
		info: {
			icon: '💡',
			classes: 'bg-[#eff6ff] border-[#93c5fd] text-[#1d4ed8]'
		}
	};

	const cfg = $derived(configs[variant]);
</script>

<div class="feedback-banner {cfg.classes}" role="alert" aria-live="polite">
	<span class="feedback-icon">{cfg.icon}</span>
	<span class="feedback-msg">{message}</span>
</div>

<style>
	.feedback-banner {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		border-radius: 12px;
		border-width: 1.5px;
		border-style: solid;
		padding: 0.75rem 1rem;
		animation: slideIn 0.25s ease both;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-6px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.feedback-icon {
		font-size: 1rem;
		flex-shrink: 0;
		margin-top: 0.05rem;
	}

	.feedback-msg {
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.5;
	}
</style>
