<script lang="ts" >
    import { page } from "$app/stores"
    export let title: string
    export let path: string
    $: active_tab = $page.url.pathname===path
</script>

<a href={path} class={`${active_tab?"bg-gray-500 ":""}  text-2xl hover:text-blue-800 p-2 rounded-md font-bold `}>
    <h1>{title}</h1>
</a>
