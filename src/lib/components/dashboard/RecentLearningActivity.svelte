<script lang="ts">
	import { Zap } from '@lucide/svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import ActivityItem from '$lib/components/ui/ActivityItem.svelte';
	import AppCard from '$lib/components/ui/AppCard.svelte';

	let { activities = [] }: { activities?: Array<{ id: string, title: string, type: 'complete' | 'xp' | 'unlock', time: string }> } = $props();
</script>

<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 350ms;">
	<AppCard class="flex flex-col gap-5 sm:p-6 border-border/60 hover:border-border">
		<h3 class="font-bold text-foreground">Aktivitas Terakhir</h3>
		
		{#if activities.length === 0}
			<EmptyState
				icon={Zap}
				title="Belum ada aktivitas belajar."
				description="Mulai perjalanan pertamamu ✨"
				class="py-4"
			/>
		{:else}
			<div class="relative border-l-2 border-muted/60 pl-5 ml-2 mt-1">
				<div class="flex flex-col gap-6">
					{#each activities as activity}
						<ActivityItem
							title={activity.title}
							time={activity.time}
							type={activity.type}
						/>
					{/each}
				</div>
			</div>
		{/if}
	</AppCard>
</div>
