<script lang="ts">
	import TrashIcon from '../../../components/TrashIcon.svelte';
	import EditIcon from '../../../components/EditIcon.svelte';
	import Switch from '../../../components/Switch.svelte';
	import EyeIcon from '../../../components/EyeIcon.svelte';
	import { loading_hidden, show_edit_item } from '$lib/store';
	import { onMount } from 'svelte';
	import type { Item } from '$lib/types';
	import { goto } from '$app/navigation';
    import { show_create_item } from '$lib/store';
	import { item_being_edited } from '$lib/utils_store';
	let data: Array<Item> = [];
	let error = false;
	const api_url = 'https://goodness-api.onrender.com/item/';
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
					const server_data = (await response.json()) as { data: Item[] };
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

	async function delete_item(id: string) {
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
		<button on:click={ ()=>{ show_create_item.set(true) } } class="hover:bg-slate-500 rounded-md bg-slate-600 w-52 text-white"
			>Ajouter un item</button
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
							<td>Sous categorie</td>
							<td>Schema</td>
							<td>Actions</td>
						</tr>
					</thead>
					<tbody>
						{#each data as item}
							<tr class=" w-full text-xl border-b-2 border-slate-300">
								<td class="py-5">{item.name}</td>
								<td class="">
									<img class=" w-12 h-12" alt="img" src={item.image} loading="lazy" />
								</td>
								<td>
									<button
										on:click={() => {
											toggle_featured(item.id, item.featured);
										}}
									>
										<Switch toggled={item.featured} />
									</button>
								</td>
								<td>
									{item.subcategory_data.name}
								</td>
                                <td  >
                                    <button class="flex items-center justify-start"on:click={()=>{
                                            if(item.schema==="{}"){
                                                    alert("Le schema de cet item est vide")
                                                    return
                                                }
                                        }} >
                                        <EyeIcon/>
                                    <button/>
                                </td>
								<td>
									<div class="flex gap-5">
										<button on:click={() => { 
                                                item_being_edited.set({ name: item.name, id: item.id, featured: item.featured, 
                                                subcategory: item.subcategory})
                                                show_edit_item.set(true)
                                            }}>
											<EditIcon />
										</button>
										<button
											on:click={() => {
												delete_item(item.id);
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
