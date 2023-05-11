<script lang="ts" >
	import { goto } from "$app/navigation";
    import "../../app.css"
    import LoadingIcon from "../../components/LoadingIcon.svelte";
    let email = ""
    let pwd = ""
    let loading = false
    let error = ""
    async function auth(){
       loading = true
       error = ""
       const response = await fetch(
           `https://goodness-api.onrender.com/auth/login`,
           {
                   method:"POST",
                   body:JSON.stringify({
                        email: email,
                        password: pwd
                       }),
                       headers:{
                               "Content-Type":"application/json"
                           }
               }
       )
       loading = false
        if(response.status===400){
                error = "Mot de passe incorrect"
                return
            }
        if(response.status===404){
                error="Utilisateur non trouve"
                return
            }
        if(response.status===200){
                const data = await response.json() as { token: string }
                localStorage.setItem("token", data.token)
                goto("/")
            }
        error = "Une erreur est survenue. Veuillez reessayer"
        }
</script>

<div class=" w-full h-screen flex flex-col justify-center items-center" >
    <h1 class="text-xl">Veuillez entrer vos identifiants d'administrateur</h1>
    <form class=" flex flex-col w-96 m-2 gap-5" on:submit|preventDefault={auth}>
       <input bind:value={email} class="border-2 rounded-md p-2" type="email" placeholder="Votre email"> 
       <input bind:value={pwd} class="border-2 rounded-md p-2" type="password" placeholder="Votre mot de passe"> 
       <button disabled={loading} class={`flex justify-center text-white bg-slate-500 text-white rounded-2xl p-2 ${loading?"hover:cursor-not-allowed":""}`} >
            {#if loading}
                <LoadingIcon/>
            {:else}
                <h1>Se connecter</h1>
            {/if}
       </button>
       <span class="text-sm text-center text-red-500" >{error}</span>
    </form>
</div>
