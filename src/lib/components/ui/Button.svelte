<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'danger';

	let {
		type = 'button',
		variant = 'primary',
		class: className = '',
		disabled = false,
		children,
		...rest
	}: {
		type?: 'button' | 'submit' | 'reset';
		variant?: Variant;
		class?: string;
		disabled?: boolean;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();

	const variantClass: Record<Variant, string> = {
		primary: 'bg-[#9381FF] text-white hover:bg-[#7B68EE]',
		secondary: 'bg-[#F1EEFF] text-[#5D4FC4] hover:bg-[#e7e0ff]',
		danger: 'bg-[#FF6B6B] text-white hover:bg-[#f45b5b]'
	};
</script>

<button
	{...rest}
	{type}
	{disabled}
	class={`inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClass[variant]} ${className}`}
>
	{@render children?.()}
</button>
