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
			path: '/item'
		},
		{
			title: 'Produits',
			path: '/product'
		},
	];
</script>

<div class="h-full w-full bg-slate-800 text-white flex flex-col px-5">
	<div class=" h-[10%] w-full">
        <img src="https://cdn.discordapp.com/attachments/1001064016925437984/1107620945188880444/logo-goodness.png" alt="">
	</div>
	<div class=" gap-5 h-[90%] flex flex-col overflow-scroll no-bar">
		{#each items as item}
			<SidebarItem title={item.title} path={item.path} />
		{/each}
	</div>
</div>
