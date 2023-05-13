<script lang="ts">
	import Switch from '../components/Switch.svelte';
	async function create() {}
	let error = '';
</script>

<div class="absolute z-30 flex flex-col w-full h-screen items-center justify-center">
	<div class="h-[500px] w-[700px] border-2 rounded-md bg-slate-400 flex flex-col">
		<h1 class="text-center text-white font-bold text-xl mb-5">Ajouter une nouvelle categorie</h1>
		<form
			action=""
			on:submit|preventDefault={create}
			class=" w-full flex flex-col items-center gap-2 text-xl"
		>
			<div class="w-[80%] flex gap-5 items-center justify-between">
				<h1 class="w-[40%] " >Nom de la categorie</h1>
				<input type="text" class="focus:outline-none w-[50%] rounded-md p-1" placeholder="" />
			</div>
			<div class="w-[80%] flex gap-5 items-center justify-between">
				<h1 class="w-[40%] " >Afficher la categorie</h1>
				<input type="text" class="focus:outline-none w-[50%] rounded-md p-1" placeholder="" />
			</div>
			<div class="w-[80%] flex gap-5 items-center justify-between">
				<h1 class="w-[40%] " >Image</h1>
				<input type="file" class="w-[50%] rounded-md p-1" placeholder="" />
			</div>
		</form>
	</div>
</div>
