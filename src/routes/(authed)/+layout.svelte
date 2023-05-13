<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import SideBar from '../../components/SideBar.svelte';
    import Header from '../../components/Header.svelte';
    import GlobalLoading from '../../modals/GlobalLoading.svelte';
	import CreateCategory from '../../modals/CreateCategory.svelte';
    import EditCategory from '../../modals/EditCategory.svelte';
	import EditSubCat from '../../modals/EditSubCat.svelte';
	import CreateSubCat from '../../modals/CreateSubCat.svelte';
	import CreateBrand from '../../modals/CreateBrand.svelte';
	import EditBrand from '../../modals/EditBrand.svelte';
	onMount(() => {
		if (browser) {
			if (!localStorage.getItem('token')) {
				goto('/auth');
			}
		}
	});
</script>


<GlobalLoading/>
<CreateCategory/>
<EditCategory/>
<CreateSubCat/>
<EditSubCat/>
<CreateBrand/>
<EditBrand/>

<main class=" w-full h-screen flex">
    <section class="h-full w-[15%]">
        <SideBar/>
    </section>
    <section class=" bg-gray-200 h-full w-[85%]">
        <Header/>
        <section class=" h-[90%] ">
            <slot/>
        </section>
    </section>
</main>
