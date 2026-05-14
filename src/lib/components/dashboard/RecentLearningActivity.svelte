<script lang="ts">
	import { CircleCheck, Zap, LockOpen } from '@lucide/svelte';

	let { activities = [] }: { activities?: Array<{ id: string, title: string, type: 'complete' | 'xp' | 'unlock', time: string }> } = $props();
</script>

<div class="flex flex-col gap-5 rounded-2xl border border-border/60 bg-card p-5 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 350ms;">
	<h3 class="font-bold text-foreground">Aktivitas Terakhir</h3>
	
	{#if activities.length === 0}
		<div class="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
			<div class="mb-3 rounded-full bg-muted p-3">
				<Zap size={24} class="opacity-40" />
			</div>
			<p class="text-sm font-medium">Belum ada aktivitas belajar.</p>
			<p class="text-xs mt-1">Mulai pelajaran pertamamu!</p>
		</div>
	{:else}
		<div class="relative border-l-2 border-muted/60 pl-5 ml-2 mt-1">
			<div class="flex flex-col gap-6">
				{#each activities as activity}
					<div class="relative">
						<div class="absolute left-[-29px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-card ring-4 ring-card">
							{#if activity.type === 'complete'}
								<CircleCheck size={16} class="text-emerald-500" />
							{:else if activity.type === 'xp'}
								<Zap size={16} class="text-amber-500" />
							{:else}
								<LockOpen size={16} class="text-primary" />
							{/if}
						</div>
						<div class="flex flex-col -mt-0.5">
							<span class="text-sm font-semibold text-foreground">{activity.title}</span>
							<span class="text-xs text-muted-foreground mt-0.5">{activity.time}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
