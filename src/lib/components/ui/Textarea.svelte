<script lang="ts">
	let {
		id,
		name,
		value = '',
		placeholder = '',
		rows = 6,
		required = false,
		class: className = '',
		...rest
	} = $props();
</script>

<textarea
	{...rest}
	{id}
	{name}
	{rows}
	{required}
	{placeholder}
	class={`w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#1F2937] shadow-sm focus:border-[#9381FF] focus:ring-2 focus:ring-[#F1EEFF] focus:outline-none ${className}`}
>{value}</textarea>
