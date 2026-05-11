<script lang="ts">
	let {
		title,
		subtitle = ''
	}: {
		title: string;
		subtitle?: string;
	} = $props();
</script>

<div class="section-title">
	<h2 class="section-title__heading">{title}</h2>
	{#if subtitle}
		<p class="section-title__subtitle">{subtitle}</p>
	{/if}
</div>

<style>
	.section-title {
		margin-bottom: 1.25rem;
	}

	.section-title__heading {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--text);
		letter-spacing: -0.02em;
		margin: 0 0 0.25rem;
		line-height: 1.3;
	}

	.section-title__subtitle {
		font-size: 0.875rem;
		color: #718096;
		margin: 0;
		line-height: 1.5;
	}
</style>
