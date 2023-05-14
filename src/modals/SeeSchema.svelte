<script lang="ts">
	import { show_see_schema } from '$lib/store';
	import CloseIcon from '../components/CloseIcon.svelte';
	import { current_schema } from '$lib/store';
</script>

{#if $show_see_schema}
	<div class="absolute z-30 flex flex-col w-full h-screen items-center justify-center">
		<div class="shadow-2xl shadow-black h-[350px] w-[400px] rounded-md bg-slate-400 flex flex-col">
			<div class=" flex justify-around items-center p-1 mb-10">
				<button
					on:click={() => {
						show_see_schema.set(false);
					}}
					class=" text-white rounded-full border-2"
				>
					<CloseIcon />
				</button>
			</div>
			<div class="flex flex-col w-full h-52 overflow-y-scroll">
				{#each $current_schema as field}
					<div class=" text-xl flex gap-5 justify-center ">
						<h1 class="underine">{field.name}</h1>
						<h1>{field.type}</h1>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
