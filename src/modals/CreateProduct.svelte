<script lang="ts">
	import { show_create_product } from '$lib/store';
	import CloseIcon from '../components/CloseIcon.svelte';
	import LoadingIcon from '../components/LoadingIcon.svelte';
	import { goto } from '$app/navigation';
	const api_url = 'https://goodness-api.onrender.com/product';
	import type { Brand, Item } from '$lib/types';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	let chosen_item_schema = writable([] as Array<{ name: string; type: string }>);
	let name = '';
	let description = '';
	let featured = true;
	let image = '';
	let image_input: HTMLInputElement;
	let loading = false;
	let brand = '';
	let price = 0;
	let in_stock = 0;
	let item = '';
	let data: Item[] = [];
	let brands: Brand[] = [];
    let discount_price: number = 0
    let is_in_discount: boolean = false
	let fields: { name: string; value: string | number }[] = [];
	onMount(async () => {
		const server_data = await fetch('https://goodness-api.onrender.com/item').then(
			async (res) => (await res.json()) as { data: Item[] }
		);
		const brands_data = await fetch('https://goodness-api.onrender.com/brand').then(
			async (res) => (await res.json()) as { data: Brand[] }
		);
		data = server_data.data;
		brands = brands_data.data;
	});

	async function create() {
		loading = true;
		const formdata = new FormData();
		formdata.append('file', image_input.files![0]);
		formdata.append('upload_preset', 'r3nc7tfx');
		await fetch('https://api.cloudinary.com/v1_1/dmqdfozqg/image/upload', {
			body: formdata,
			method: 'POST'
		})
			.then(async (res) => {
				if (res.status === 200) {
					const { secure_url } = (await res.json()) as { secure_url: string };
					image = secure_url;
					$chosen_item_schema.map((field) => {
						const node = document.getElementsByName(field.name)[0] as HTMLInputElement;
						fields.push({ name: field.name, value: node.value });
					});
					console.log(fields);
					await fetch(api_url, {
						method: 'POST',
						body: JSON.stringify({
							name,
							featured,
							description,
							images: [image],
							brand,
							price,
							in_stock,
							pay_at_delivery: false,
							is_in_discount,
							discount_price: is_in_discount ? discount_price : null,
							item,
							fields: JSON.stringify(fields)
						}),
						headers: {
							Authorization: localStorage.getItem('token')!,
							'Content-Type': 'application/json'
						}
					}).then((res) => {
						if (res.status === 401) goto('/auth');
						if (res.status === 201) {
							window.location.href = '/product';
							return;
						}
						if (res.status === 409) {
							loading = false;
							alert('Un item avec le meme nom existe deja');
							return;
						}
						loading = false;
						alert('Une erreur est survenue. Reessayer ou contactez les developpeurs');
					});
				}
			})
			.catch((err) => {
				loading = false;
				console.log(err);
				alert("Une erreur s'est produite, veuillez reessayer");
			});
	}
	function item_changed(id: string) {
		const item = data.find((it) => it.id === id)!;
		const parsed = JSON.parse(item.schema) as { name: string; type: string }[];
		chosen_item_schema.set(parsed);
	}
</script>

{#if $show_create_product}
	<div class="absolute z-30 flex flex-col w-full h-screen items-center justify-center">
		<div class="shadow-2xl shadow-black h-[400px] w-[700px] rounded-md bg-slate-400 flex flex-col">
			<div class=" flex justify-around items-center p-1 mb-10">
				<button
					on:click={() => {
						show_create_product.set(false);
					}}
					class=" text-white rounded-full border-2"
				>
					<CloseIcon />
				</button>
			</div>
			<form
				on:submit|preventDefault={create}
				class=" w-full overflow-y-scroll my-2 flex flex-col items-center gap-2 text-xl"
			>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Nom du produit</h1>
					<input
						bind:value={name}
						required
						type="text"
						class="focus:outline-none w-[50%] rounded-md p-1"
						placeholder=""
					/>
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Description</h1>
					<input
						bind:value={description}
						type="text"
						class="focus:outline-none w-[50%] rounded-md p-1"
						placeholder=""
					/>
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Afficher</h1>
					<label class="relative inline-flex items-center w-[50%] cursor-pointer">
						<input bind:checked={featured} type="checkbox" value="" class="sr-only peer" />
						<div
							class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
						/>
					</label>
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Prix</h1>
					<input
						bind:value={price}
						required
						type="number"
						class="focus:outline-none w-[50%] rounded-md p-1"
						placeholder=""
					/>
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Produit en reduction?</h1>
					<label class="relative inline-flex items-center w-[50%] cursor-pointer">
						<input bind:checked={is_in_discount} type="checkbox" value="" class="sr-only peer" />
						<div
							class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
						/>
					</label>
				</div>
				{#if is_in_discount}
					<div class="w-[80%] flex gap-5 items-center justify-between">
						<h1 class="text-white w-[40%]">Prix en reduction</h1>
						<input
							bind:value={discount_price}
							required
							type="number"
							class="focus:outline-none w-[50%] rounded-md p-1"
							placeholder=""
						/>
					</div>
				{/if}
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Quantite en stock</h1>
					<input
						bind:value={in_stock}
						required
						type="number"
						class="focus:outline-none w-[50%] rounded-md p-1"
						placeholder=""
					/>
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Image</h1>
					<input
						bind:this={image_input}
						required
						type="file"
						accept="image/*"
						class="focus:outline-none w-[50%] rounded-md p-1"
						placeholder=""
					/>
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Marque</h1>
					<select name="" bind:value={brand} class="p-1 w-[50%]" id="">
						{#each brands as brand}
							<option value={brand.id}>{brand.name}</option>
						{/each}
					</select>
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Item</h1>
					<select
						required
						name=""
						bind:value={item}
						on:change={() => {
							item_changed(item);
						}}
						class="p-1 w-[50%]"
						id=""
					>
						{#each data as item}
							<option value={item.id}>{item.name}</option>
						{/each}
					</select>
				</div>
				{#each $chosen_item_schema as field}
					<div class="w-[80%] flex gap-5 items-center justify-between">
						<h1 class="text-white w-[40%]">{field.name}</h1>
						<input name={field.name} required class="w-[50%] p-1 rounded-md" type={field.type} />
					</div>
				{/each}
				<button class="mt-5 flex justify-center bg-slate-700 text-white p-2 rounded-md">
					{#if loading}
						<LoadingIcon />
					{:else}
						<h1>Valider</h1>
					{/if}
				</button>
			</form>
		</div>
	</div>
{/if}
