<script lang="ts">
	let { class: className = '', children } = $props();
</script>

<div class={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
	{@render children?.()}
</div>
