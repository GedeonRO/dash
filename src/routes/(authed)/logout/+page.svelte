<script lang="ts" >
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

    onMount(()=>{
            if(browser){
                    localStorage.removeItem("token")
                    window.location.href="/auth"
                }
        })
</script>
