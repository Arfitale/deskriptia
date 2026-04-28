<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
const initialDraft = $derived(data.draft.data);
let form = $state({
	judul: initialDraft.judul ?? '',
	deskripsiObjek: initialDraft.deskripsiObjek ?? '',
	simpulan: initialDraft.simpulan ?? ''
});
let saveMessage = $state('');
	let timer: ReturnType<typeof setTimeout> | null = null;

	const saveDraft = async () => {
		const response = await fetch(`/api/drafts/${data.draft.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		});
		saveMessage = response.ok ? 'Saved.' : 'Failed to save.';
	};

	const onInputChange = () => {
		saveMessage = 'Saving...';
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			void saveDraft();
		}, 600);
	};
</script>

<main class="mx-auto min-h-screen max-w-4xl px-6 py-8">
	<a href="/dashboard" class="mb-4 inline-block text-sm text-[#5D4FC4] hover:underline">← Back</a>
	<Card>
		<h1 class="mb-1 text-2xl font-bold text-[#1F2937]">Practice Draft</h1>
		<p class="mb-6 text-sm text-[#6B7280]">Material: {data.draft.materialTitle}</p>

		<div class="space-y-4">
			<div>
				<label for="judul" class="mb-1 block text-sm font-medium text-[#1F2937]">Judul</label>
				<Input
					id="judul"
					name="judul"
					value={form.judul}
					oninput={(event: Event) => {
						form.judul = (event.currentTarget as HTMLInputElement).value;
						onInputChange();
					}}
				/>
			</div>

			<div>
				<label for="deskripsi" class="mb-1 block text-sm font-medium text-[#1F2937]"
					>Deskripsi Objek</label
				>
				<Textarea
					id="deskripsi"
					name="deskripsi"
					value={form.deskripsiObjek}
					oninput={(event: Event) => {
						form.deskripsiObjek = (event.currentTarget as HTMLTextAreaElement).value;
						onInputChange();
					}}
				/>
			</div>

			<div>
				<label for="simpulan" class="mb-1 block text-sm font-medium text-[#1F2937]">Simpulan</label>
				<Textarea
					id="simpulan"
					name="simpulan"
					value={form.simpulan}
					oninput={(event: Event) => {
						form.simpulan = (event.currentTarget as HTMLTextAreaElement).value;
						onInputChange();
					}}
				/>
			</div>
		</div>

		<div class="mt-6 flex items-center gap-3">
			<Button onclick={saveDraft}>Save</Button>
			<span class="text-sm text-[#6B7280]">{saveMessage}</span>
		</div>
	</Card>
</main>
