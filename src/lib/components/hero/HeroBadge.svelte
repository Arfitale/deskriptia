<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<span
	class="bg-primary-soft inline-flex w-fit items-center rounded-full border border-primary/20 px-3.5 py-1 text-xs font-bold tracking-wide text-primary uppercase"
>
	{label}
</span>
