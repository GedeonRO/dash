<script lang="ts">
	import { show_edit_brand } from '$lib/store';
	import CloseIcon from '../components/CloseIcon.svelte';
	import LoadingIcon from '../components/LoadingIcon.svelte';
	import { goto } from '$app/navigation';
	import { brand_being_edited } from '$lib/utils_store';
	import { onMount } from 'svelte';
	const api_url = 'https://goodness-api.onrender.com/brand';
	let name : string;
	let featured : boolean ;
	let image: undefined | string;
	let image_input: HTMLInputElement;
	let loading = false;
    onMount(()=>{
            name = $brand_being_edited.name
            featured = $brand_being_edited.featured
        })

	async function update() {
		loading = true;
        if(image_input.files?.length===0){
                await fetch(api_url, {
                        method:"PUT",
                        body: JSON.stringify({ id: $brand_being_edited.id, featured, name }),
                        headers:{
                                "Authorization":localStorage.getItem("token")!,
                                "Content-Type":"application/json"
                            }
                    }).then(res=>{
                            loading = false
                            if(res.status===200) {
                                    window.location.href="/brand"
                                    return
                                }
                            if(res.status===401) goto("/auth")
                            if(res.status===409) {
                                    alert("Une categorie avec le meme nom existe deja")
                                    return
                                }
                            alert("Une erreur est survenue. Reessayer ou contactez les developpeurs")
                            return
                        })
            }
		if (image_input.files?.length !== 0) {
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
							method: 'PUT',
							body: JSON.stringify({ id: $brand_being_edited.id, name, featured, image }),
							headers: {
								Authorization: localStorage.getItem('token')!,
								'Content-Type': 'application/json'
							}
						}).then((res) => {
							if (res.status === 401) goto('/auth');
							if (res.status === 200) {
								window.location.href = '/brand';
								return;
							}
							if (res.status === 409) {
								loading = false;
								alert('Une marque avec le meme nom existe deja');
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
	}
</script>

{#if $show_edit_brand}
	<div class="absolute z-30 flex flex-col w-full h-screen items-center justify-center">
		<div class="shadow-2xl shadow-black h-[350px] w-[700px] rounded-md bg-slate-400 flex flex-col">
			<div class=" flex justify-around items-center p-1 mb-10">
				<button
					on:click={() => {
						show_edit_brand.set(false);
					}}
					class=" text-white rounded-full border-2"
				>
					<CloseIcon />
				</button>
			</div>
			<form
				on:submit|preventDefault={update}
				class=" w-full flex flex-col items-center gap-2 text-lg"
			>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="text-white w-[40%]">Nom de la marque</h1>
					<input
						bind:value={name}
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
					<h1 class="text-white w-[40%]">Image</h1>
					<input
						bind:this={image_input}
						type="file"
						accept="image/*"
						class="focus:outline-none w-[50%] rounded-md p-1"
						placeholder=""
					/>
				</div>
				<button class="flex justify-center bg-slate-700 text-white p-2 rounded-md">
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
