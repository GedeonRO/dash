<script lang="ts" >
    import "../../app.css"
    import LoadingIcon from "../../components/LoadingIcon.svelte";
    let email = ""
    let pwd = ""
    let loading = true
    function auth(){

        }
</script>

<div class=" w-full h-screen flex flex-col justify-center items-center" >
    <h1 class="text-xl">Veuillez entrer vos identifiants d'administrateur</h1>
    <form class=" flex flex-col w-96 m-2 gap-5">
       <input class="border-2 rounded-md p-2" type="text" placeholder="Votre email"> 
       <input class="border-2 rounded-md p-2" type="password" placeholder="Votre mot de passe"> 
       <button class=" flex justify-center text-white bg-slate-500 text-white rounded-2xl p-2" >
            {#if loading}
                <LoadingIcon/>
            {:else}
                <h1>Se connecter</h1>
            {/if}
       </button>
    </form>
</div>
