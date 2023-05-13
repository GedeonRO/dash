<script lang="ts">
	import TrashIcon from '../../../components/TrashIcon.svelte';
	import EditIcon from '../../../components/EditIcon.svelte';
	import Switch from '../../../components/Switch.svelte';
	import { loading_hidden, show_edit_subcategory } from '$lib/store';
	import { onMount } from 'svelte';
	import type { SubCategory } from '$lib/types';
	import { goto } from '$app/navigation';
    import { show_create_subcategory } from '$lib/store';
	import { subcat_being_edited } from '$lib/utils_store';
	import CreateSubCat from '../../../modals/CreateSubCat.svelte';
	let data: Array<SubCategory> = [];
	let error = false;
	const api_url = 'https://goodness-api.onrender.com/subcategory/';
	async function load_data() {
		loading_hidden.set(false);
		await fetch(api_url)
			.then(async (response) => {
				if (response.status === 500) {
					error = true;
					loading_hidden.set(false);
					return;
				}
				if (response.status === 200) {
					const server_data = (await response.json()) as { data: SubCategory[] };
					data = server_data.data;
					loading_hidden.set(true);
					return;
				}
			})
			.catch((_) => {
                    console.log("err")
                    error = true
                    loading_hidden.set(true)
                });
	}
	onMount(async () => {
		await load_data();
	});

	async function delete_subcategory(id: string) {
		loading_hidden.set(false);
		await fetch(api_url, {
			method: 'DELETE',
			body: JSON.stringify({ id }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token')!
			}
		}).then(async (response) => {
			loading_hidden.set(true);
			if (response.status === 401) goto('/auth');
			if (response.status === 404) await load_data();
			if (response.status === 200) await load_data();
			if (response.status === 500) {
				error = true;
				loading_hidden.set(true);
			}
		});
	}
	async function toggle_featured(id: string, featured: boolean) {
		loading_hidden.set(false);
		await fetch(api_url, {
			method: 'PUT',
			headers: {
				Authorization: localStorage.getItem('token')!,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, featured: !featured })
		});
		await load_data();
	}
</script>

<div class="w-full h-full p-2 flex flex-col gap-5">
	<div class="flex justify-between w-full">
		<input type="text" placeholder="Recherche" class="rounded-md p-2 w-96" />
		<button on:click={ ()=>{ show_create_subcategory.set(true) } } class="hover:bg-slate-500 rounded-md bg-slate-600 w-52 text-white"
			>Ajouter une sous categorie</button
		>
	</div>
	<div class="flex flex-col overflow-scroll no-bar w-full shadow-inner h-full">
		{#if $loading_hidden}
			{#if error}
				<span>Une erreur est survenue. Veuillez reessayer ou contacter les developpeurs</span>
			{:else}
				<table class="table-auto">
					<thead class="border-b-2 border-slate-300">
						<tr class="w-full font-bold">
							<td>Nom</td>
							<td>Image</td>
							<td>Featured</td>
							<td>Categorie</td>
							<td>Actions</td>
						</tr>
					</thead>
					<tbody>
						{#each data as subcategory}
							<tr class=" w-full text-xl border-b-2 border-slate-300">
								<td class="py-5">{subcategory.name}</td>
								<td class="">
									<img class=" w-12 h-12" alt="img" src={subcategory.image} loading="lazy" />
								</td>
								<td>
									<button
										on:click={() => {
											toggle_featured(subcategory.id, subcategory.featured);
										}}
									>
										<Switch toggled={subcategory.featured} />
									</button>
								</td>
								<td>
									{subcategory.category_data.name}
								</td>
								<td>
									<div class="flex gap-5">
										<button on:click={() => { 
                                                subcat_being_edited.set({ name: subcategory.name, id: subcategory.id, featured: subcategory.featured, 
                                                category: subcategory.category})
                                                show_edit_subcategory.set(true)
                                            }}>
											<EditIcon />
										</button>
										<button
											on:click={() => {
												delete_subcategory(subcategory.id);
											}}
										>
											<TrashIcon />
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		{/if}
	</div>
</div>
