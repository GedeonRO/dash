<script lang="ts">
	import TrashIcon from '../../../components/TrashIcon.svelte';
	import EditIcon from '../../../components/EditIcon.svelte';
	import Switch from '../../../components/Switch.svelte';
	import EyeIcon from '../../../components/EyeIcon.svelte';
	import { current_schema, loading_hidden, show_edit_item, show_see_schema } from '$lib/store';
	import { onMount } from 'svelte';
	import type { Product } from '$lib/types';
	import { goto } from '$app/navigation';
    import { show_create_product } from '$lib/store';
	import { item_being_edited } from '$lib/utils_store';
	import EditProduct from '../../../modals/EditProduct.svelte';
	let data: Array<Product> = [];
	let error = false;
	const api_url = 'https://goodness-api.onrender.com/product/';
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
					const server_data = (await response.json()) as { data: Product[] };
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
    function show_schema(str_schema:string){
            const parsed = JSON.parse(str_schema) as { name:string, type:string }[]
            if(parsed.length===0){
                    alert("Cet item n'a pas de schema")
                    return
                }
            current_schema.update((_)=>{
                    return parsed
                })
            show_see_schema.set(true)
        }
</script>

<div class="w-full h-full p-2 flex flex-col gap-5">
	<div class="flex justify-between w-full">
		<input type="text" placeholder="Recherche" class="rounded-md p-2 w-96" />
		<button on:click={ ()=>{ show_create_product.set(true) } } class="hover:bg-slate-500 rounded-md bg-slate-600 w-52 text-white"
			>Ajouter un produit</button
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
							<td>Prix</td>
							<td>Prix en reduction</td>
							<td>En stock</td>
							<td>Marque</td>
							<td>Item</td>
							<td>Autre</td>
							<td>Actions</td>
						</tr>
					</thead>
					<tbody>
						{#each data as product}
							<tr class=" w-full text-xl border-b-2 border-slate-300">
								<td class="py-5">{product.name}</td>
								<td class="">
									<img class=" w-12 h-12" alt="img" src={product.images} loading="lazy" />
								</td>
								<td>
									<button
										on:click={() => {
											toggle_featured(product.id, product.featured);
										}}
									>
										<Switch toggled={product.featured} />
									</button>
								</td>
								<td>
									{product.price}
								</td>
								<td>
									{product.is_in_discount? product.discount_price : "-"}
								</td>
								<td>
									{product.in_stock}
								</td>
								<td>
									{product.brand_data.name}
								</td>
								<td>
									{product.item_data.name}
								</td>
                                <td>
                                    <button class="flex items-center justify-start"on:click={()=>{ show_schema(product.item_data.schema) } } >
                                        <EyeIcon/>
                                    <button/>
                                </td>
								<td>
									<div class="flex gap-5">
										<button on:click={() => { 
                                                item_being_edited.set({ name: product.name, id: product.id, featured: product.featured, 
                                                subcategory: product.item})
                                                show_edit_item.set(true)
                                            }}>
											<EditIcon />
										</button>
										<button
											on:click={() => {
												delete_item(product.id);
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
