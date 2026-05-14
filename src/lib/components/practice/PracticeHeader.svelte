<script lang="ts">
	let { title, description }: { title: string; description: string } = $props();
</script>

<div class="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
	<h1 class="text-[1.75rem] font-extrabold tracking-tight text-foreground sm:text-4xl">{title}</h1>
	<p class="mt-2 text-base text-muted-foreground">{description}</p>
</div>
