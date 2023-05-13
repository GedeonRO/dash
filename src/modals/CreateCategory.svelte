<script lang="ts">
	import Switch from '../components/Switch.svelte';
	import { show_create_category } from '$lib/store';
	import CloseIcon from '../components/CloseIcon.svelte';
	async function create() {}
	let error = '';
</script>

{#if $show_create_category}
	<div class="absolute z-30 flex flex-col w-full h-screen items-center justify-center">
		<div class="h-[500px] w-[700px] border-2 rounded-md bg-slate-400 flex flex-col">
			<div class=" flex justify-around items-center p-1 mb-10">
				<button
					on:click={() => {
						show_create_category.set(false);
					}}
					class=" text-white rounded-full border-2"
				>
					<CloseIcon />
				</button>
			</div>
			<form
				action=""
				on:submit|preventDefault={create}
				class=" w-full flex flex-col items-center gap-2 text-xl"
			>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="w-[40%]">Nom de la categorie</h1>
					<input type="text" class="focus:outline-none w-[50%] rounded-md p-1" placeholder="" />
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="w-[40%]">Afficher la categorie</h1>
					<input type="text" class="focus:outline-none w-[50%] rounded-md p-1" placeholder="" />
				</div>
				<div class="w-[80%] flex gap-5 items-center justify-between">
					<h1 class="w-[40%]">Image</h1>
					<input type="file" class="w-[50%] rounded-md p-1" placeholder="" />
				</div>
			</form>
		</div>
	</div>
{/if}
