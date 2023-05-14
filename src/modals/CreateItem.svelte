<script lang="ts">
	import { show_create_item } from '$lib/store';
	import CloseIcon from '../components/CloseIcon.svelte';
	import LoadingIcon from '../components/LoadingIcon.svelte';
	import { goto } from '$app/navigation';
	const api_url = 'https://goodness-api.onrender.com/item';
	import type { SubCategory } from '$lib/types';
	import { onMount } from 'svelte';
	import AddIcon from '../components/AddIcon.svelte';
	import TrashIcon from '../components/TrashIcon.svelte';
	import { writable } from 'svelte/store';
	let name = '';
	let featured = true;
	let image = '';
	let image_input: HTMLInputElement;
	let loading = false;
	let subcategory = '';
    const schema = writable([] as {name: string, type: string}[])
	let field_name = "";
	let field_type = "text" ;
	let show_create_schema = false;
	let data: SubCategory[] = [];
	onMount(async () => {
		const server_data = await fetch('https://goodness-api.onrender.com/subcategory').then(
			async (res) => (await res.json()) as { data: SubCategory[] }
		);
		data = server_data.data;
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
					await fetch(api_url, {
						method: 'POST',
						body: JSON.stringify({ name, featured, image, schema: JSON.stringify($schema), subcategory }),
						headers: {
							Authorization: localStorage.getItem('token')!,
							'Content-Type': 'application/json'
						}
					}).then((res) => {
						if (res.status === 401) goto('/auth');
						if (res.status === 201) {
							window.location.href = '/item';
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
</script>




{#if show_create_schema}
	<div class="absolute z-50 flex flex-col w-full h-screen items-center justify-center">
		<div class="shadow-2xl shadow-black h-[500px] w-[500px] rounded-md bg-slate-400 flex flex-col">
			<div class=" flex justify-around items-center p-1 mb-10">
				<button
					on:click={() => {
						show_create_schema = false;
					}}
					class=" text-white rounded-full border-2"
				>
					<CloseIcon />
				</button>
			</div>
			<form
				on:submit|preventDefault={create}
				class=" w-full flex flex-col items-center gap-2 text-xl"
			>
				<div class="flex justify-around w-full items-center">
					<input
						bind:value={field_name}
						type="text"
						class="focus:outline-none p-1 rounded-md"
						placeholder="Nom du champ"
						name=""
						id=""
					/>
					<select bind:value={field_type} name="" id="" class="focus:outline-none p-1 rounded-md">
						<option value="text">Texte</option>
						<option value="number">Nombre</option>
					</select>
					<button type="button" on:click={() => { 
                            if(field_type===""&&field_name==="") return
                            schema.update((value)=>{
                                    value.push({ name: field_name, type: field_type })
                                    return value
                                })
                            field_name=""
                        }} class=" rounded-md bg-slate-600 p-1 text-white">
						<AddIcon />
					</button>
				</div>
				<div class="w-full flex flex-col mt-10 h-[250px] overflow-y-scroll">
					{#each $schema as field}
						<div class="flex justify-around w-full items-center">
							<h1 class="p-1 text-center w-[50%] overflow-hidden">{field.name}</h1>
							<h1 class="p-1 text-center w-[30%]">{field.type}</h1>
							<button on:click={()=>{
                                    schema.update((value)=>{
                                            value = value.filter((curr_field)=>curr_field.name!==field.name)
                                            return value
                                        })
                                }}  class="flex items-center p-1 hover:text-red-500 text-white">
								<TrashIcon />
							</button>
						</div>
					{/each}
				</div>
				<button
					class="items-center p-1 hover:bg-slate-500 rounded-md bg-slate-600 w-[50%] text-white"
                    on:click={()=>{ show_create_schema=false }}
				>
					<h1>Valider</h1>
				</button>
			</form>
		</div>
	</div>
{/if}

{#if $show_create_item}
	<div class="absolute z-30 flex flex-col w-full h-screen items-center justify-center">
		<div class="shadow-2xl shadow-black h-[400px] w-[700px] rounded-md bg-slate-400 flex flex-col">
			<div class=" flex justify-around items-center p-1 mb-10">
				<button
					on:click={() => {
						show_create_item.set(false);
					}}
					class=" text-white rounded-full border-2"
				>
					<CloseIcon />
				</button>
			</div>
			<form
				on:submit|preventDefault={create}
				class=" w-full flex flex-col items-center gap-2 text-xl"
			>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Nom de l'item</h1>
					<input
						bind:value={name}
						required
						type="text"
						class="focus:outline-none w-[50%] rounded-md p-1"
						placeholder=""
					/>
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Sous categorie</h1>
					<select required name="" bind:value={subcategory} class="p-1 w-[50%]" id="">
						{#each data as category}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
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
					<h1 class="text-white w-[40%]">Schema</h1>
					<button
                        type="button"
						class="items-center p-1 hover:bg-slate-500 rounded-md bg-slate-600 w-[50%] text-white"
						on:click={() => {
							show_create_schema = true;
						}}
					>
						<h1>Ajouter un schema</h1>
					</button>
				</div>
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
