<script lang="ts">
	let {
		isLast = false,
		state
	}: {
		isLast?: boolean;
		state: 'completed' | 'current' | 'upcoming' | 'locked';
	} = $props();
</script>

<div class="box-border flex w-full justify-center pl-[19px]" aria-hidden="true">
	<div
		class="h-7 w-0.5 rounded-full transition-[background] duration-400 ease-out"
		class:bg-[var(--success)]={state === 'completed'}
		class:bg-gradient-to-b={state === 'current'}
		class:from-[var(--success)]={state === 'current'}
		class:to-[var(--primary)]={state === 'current'}
		class:bg-[var(--border)]={state === 'locked' || state === 'upcoming'}
	></div>
</div>
