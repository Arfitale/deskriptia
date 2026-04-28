<script lang="ts">
	let {
		id,
		name,
		type = 'text',
		value = '',
		placeholder = '',
		required = false,
		class: className = '',
		...rest
	} = $props();
</script>

<input
	{...rest}
	{id}
	{name}
	{type}
	{value}
	{placeholder}
	{required}
	class={`w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#1F2937] shadow-sm focus:border-[#9381FF] focus:ring-2 focus:ring-[#F1EEFF] focus:outline-none ${className}`}
/>
