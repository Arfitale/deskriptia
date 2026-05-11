<script lang="ts">
	let {
		value = 0,
		max = 100,
		showLabel = false,
		label = '',
		color = 'primary'
	}: {
		value?: number;
		max?: number;
		showLabel?: boolean;
		label?: string;
		color?: 'primary' | 'success' | 'warning';
	} = $props();

	const percentage = $derived(Math.min(100, Math.max(0, (value / max) * 100)));

	const colorMap = {
		primary: 'var(--primary)',
		success: 'var(--success)',
		warning: 'var(--warning, #fbbf24)'
	};
</script>

<div class="progress-wrap" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label || 'Progress'}>
	{#if showLabel}
		<div class="progress-header">
			{#if label}
				<span class="progress-label">{label}</span>
			{/if}
			<span class="progress-value">{Math.round(percentage)}%</span>
		</div>
	{/if}
	<div class="progress-track">
		<div
			class="progress-fill"
			style:width="{percentage}%"
			style:background={colorMap[color]}
		></div>
	</div>
</div>

<style>
	.progress-wrap {
		width: 100%;
	}

	.progress-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.4rem;
	}

	.progress-label {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text);
	}

	.progress-value {
		font-size: 0.75rem;
		font-weight: 600;
		color: #718096;
	}

	.progress-track {
		height: 8px;
		background: var(--border);
		border-radius: 99px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		border-radius: 99px;
		transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
		background: var(--primary);
	}
</style>
