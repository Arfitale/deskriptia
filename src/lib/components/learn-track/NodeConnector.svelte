<script lang="ts">
	let {
		isLast = false,
		state
	}: {
		isLast?: boolean;
		state: 'completed' | 'current' | 'upcoming' | 'locked';
	} = $props();
</script>

<div class="connector-wrap" aria-hidden="true">
	<div
		class="connector-line"
		class:connector-line--completed={state === 'completed'}
		class:connector-line--current={state === 'current'}
		class:connector-line--locked={state === 'locked' || state === 'upcoming'}
	></div>
</div>

<style>
	.connector-wrap {
		display: flex;
		justify-content: center;
		width: 100%;
		padding-left: 19px;
		/* Align with center of the node icon (icon is ~40px wide, centered at 20px) */
		box-sizing: border-box;
	}

	.connector-line {
		width: 2px;
		height: 28px;
		border-radius: 99px;
		transition: background 0.4s ease;
	}

	.connector-line--completed {
		background: var(--success);
	}

	.connector-line--current {
		background: linear-gradient(180deg, var(--success) 0%, var(--primary) 100%);
	}

	.connector-line--locked {
		background: var(--border);
	}
</style>
