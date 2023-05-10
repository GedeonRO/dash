<script>
	import '../../app.css';
	import { onMount } from 'svelte';
    import Appbar from '../../components/Appbar.svelte';
    import Drawer from '../../components/Drawer.svelte';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
	onMount(() => {
		if (browser) {
			if (!localStorage.getItem('token')) {
				goto('/auth');
			}
		}
	});
</script>

<main class=" w-full h-screen">
	<Appbar />
	<div class="h-[93%] w-full flex">
		<Drawer />
		<slot />
	</div>
</main>
