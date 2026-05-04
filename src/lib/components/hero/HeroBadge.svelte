<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<span class="bg-primary-soft text-primary border-primary/20 inline-flex w-fit items-center rounded-full border px-3.5 py-1 text-xs font-bold tracking-wide uppercase">
	{label}
</span>