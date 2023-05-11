<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import SideBar from '../../components/SideBar.svelte';
	onMount(() => {
		if (browser) {
			if (!localStorage.getItem('token')) {
				goto('/auth');
			}
		}
	});
</script>

<main class=" w-full h-screen flex">
    <section class="h-full w-[15%]">
        <SideBar/>
    </section>
    <section class=" bg-gray-200 h-full w-[85%]">
        <slot/>
    </section>
</main>
