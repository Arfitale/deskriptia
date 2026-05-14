<script lang="ts">
	import { TextAlignStart, Type, Search, PenTool, ArrowRight } from '@lucide/svelte';

	const categories = [
		{ id: 'struktur', title: 'Struktur Teks', description: 'Latih pemahamanmu tentang identifikasi dan deskripsi', icon: TextAlignStart, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'hover:border-indigo-500/40' },
		{ id: 'kaidah', title: 'Kaidah Bahasa', description: 'Pahami gaya bahasa, kata sifat, dan majas', icon: Type, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'hover:border-emerald-500/40' },
		{ id: 'identifikasi', title: 'Identifikasi', description: 'Temukan elemen penting dalam contoh teks', icon: Search, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'hover:border-amber-500/40' },
		{ id: 'menulis', title: 'Menulis Deskripsi', description: 'Praktik menulis paragraf deskriptif', icon: PenTool, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'hover:border-rose-500/40' }
	];
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both" style="animation-delay: 150ms;">
	{#each categories as cat}
		<a href="/practice/{cat.id}" class="group relative flex flex-col gap-4 rounded-3xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg {cat.border}">
			<div class="flex items-center justify-between">
				<div class="flex h-12 w-12 items-center justify-center rounded-2xl {cat.bg} transition-transform group-hover:scale-110">
					<cat.icon size={24} class={cat.color} />
				</div>
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
					<ArrowRight size={16} class="transition-transform group-hover:translate-x-0.5" />
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-bold text-foreground">{cat.title}</h3>
				<p class="mt-1 text-sm text-muted-foreground">{cat.description}</p>
			</div>
		</a>
	{/each}
</div>
