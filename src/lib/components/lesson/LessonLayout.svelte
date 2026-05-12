<script lang="ts">
	let { children } = $props();
</script>

<div class="lesson-shell">
	<div class="lesson-column">
		{@render children()}
	</div>
</div>

<style>
	.lesson-shell {
		min-height: 100dvh;
		background: var(--bg);
		display: flex;
		justify-content: center;
		padding: 0 1rem 4rem;
	}

	.lesson-column {
		width: 100%;
		max-width: 680px;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	@media (max-width: 768px) {
		.lesson-shell {
			padding: 0 0 5rem;
		}
	}
</style>
