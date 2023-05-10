<script lang="ts">
	import DrawerItem from './DrawerItem.svelte';
	const items: { title: string; path: string }[] = [
		{
			title: 'Catégories',
			path: '/categories'
		},
		{
			title: 'Sous catégories',
			path: '/subcategories'
		},
		{
			title: 'Items',
			path: '/items'
		}
	];
</script>

<div class="border-r-2 border-blue-500 p-2 w-[20%] h-[100%] flex flex-col gap-5">
	{#each items as item}
		<DrawerItem path={item.path} title={item.title} />
	{/each}
</div>
