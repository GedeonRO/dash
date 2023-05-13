<script lang="ts">
	import SidebarItem from './SidebarItem.svelte';
	const items: { title: string; path: string }[] = [
		{
			title: 'Categories',
			path: '/category'
		},
		{
			title: 'Sous categories',
			path: '/sub_category'
		},
		{
			title: 'Marques',
			path: '/brand'
		},
		{
			title: 'Items',
			path: '/items'
		},
		{
			title: 'Produits',
			path: '/products'
		},
		{
			title: 'Utilisateurs',
			path: '/users'
		}
	];
</script>

<div class="h-full w-full bg-slate-800 text-white flex flex-col px-5">
	<div class=" h-[10%] w-full">
		<h1>LOGO</h1>
		<h1>GoodnessUnit</h1>
	</div>
	<div class=" gap-5 h-[90%] flex flex-col overflow-scroll no-bar">
		{#each items as item}
			<SidebarItem title={item.title} path={item.path} />
		{/each}
	</div>
</div>
