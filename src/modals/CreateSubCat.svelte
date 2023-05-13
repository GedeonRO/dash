<script lang="ts">
	import { show_create_subcategory } from '$lib/store';
	import CloseIcon from '../components/CloseIcon.svelte';
	import LoadingIcon from '../components/LoadingIcon.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Category } from '$lib/types';
	const api_url = 'https://goodness-api.onrender.com/subcategory';
    let data : Category[] = []
	let name = '';
	let featured = true;
	let image = '';
    let category = ""
	let image_input: HTMLInputElement;
    let loading = false
    onMount(async()=>{
            const server_data = await fetch("https://goodness-api.onrender.com/category").then(async res=> await res.json() as { data: Category[] } )
            data = server_data.data
        })

	async function create() {
        loading = true
		const formdata = new FormData();
		formdata.append('file', image_input.files![0]);
		formdata.append('upload_preset', 'r3nc7tfx');
		await fetch('https://api.cloudinary.com/v1_1/dmqdfozqg/image/upload', {
			body: formdata,
            method:"POST"
		})
			.then(async (res) => {
                if(res.status===200){
                    const { secure_url } = (await res.json()) as { secure_url: string };
                    image = secure_url
                    await fetch(
                        api_url,
                        {
                                method:"POST",
                                body:JSON.stringify({ name, featured, image, category }),
                                headers:{
                                        "Authorization":localStorage.getItem("token")!,
                                        "Content-Type":"application/json"
                                    }
                            }
                    ).then(res=>{
                            if(res.status===401) goto("/auth")
                            if(res.status===201) {
                                    window.location.href="/sub_category"
                                    return
                                }
                            if(res.status===409){
                                    loading = false
                                    alert("Une sous categorie avec le meme nom existe deja dans la categorie specifiee")
                                    return
                                }
                            loading = false
                            alert("Une erreur est survenue. Reessayer ou contactez les developpeurs")
                        })

                    }
			})
			.catch((err) => {
                loading = false
				console.log(err);
				alert("Une erreur s'est produite, veuillez reessayer");
			});
	}
</script>

{#if $show_create_subcategory}
	<div class="absolute z-30 flex flex-col w-full h-screen items-center justify-center">
		<div class="shadow-2xl shadow-black h-[350px] w-[700px] rounded-md bg-slate-400 flex flex-col">
			<div class=" flex justify-around items-center p-1 mb-10">
				<button
					on:click={() => {
						show_create_subcategory.set(false);
					}}
					class=" text-white rounded-full border-2"
				>
					<CloseIcon />
				</button>
			</div>
			<form
				on:submit|preventDefault={create}
				class=" w-full flex flex-col items-center gap-2 text-lg"
			>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Nom de la Sous categorie</h1>
					<input
						bind:value={name}
						required
						type="text"
						class="focus:outline-none w-[50%] rounded-md p-1"
						placeholder=""
					/>
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Categorie</h1>
					<select required name="" bind:value={category} class="p-1 w-[50%]" id="">
                        {#each data as category}
                            <option value={category.id}>{category.name}</option>
                        {/each}
                    </select>
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Afficher</h1>
					<label class="relative inline-flex items-center w-[50%] cursor-pointer">
						<input required bind:checked={featured} type="checkbox" value="" class="sr-only peer" />
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
				<button class="flex justify-center bg-slate-700 text-white p-2 rounded-md">
                    {#if loading}
                        <LoadingIcon/>
                    {:else}
                        <h1>Valider</h1>
                    {/if}
				</button>
			</form>
		</div>
	</div>
{/if}
