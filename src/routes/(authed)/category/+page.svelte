<script lang="ts">
    const categories : {name:string, image:string, featured:boolean}[] = [
        {
                name:"Test",
                image:"https://picsum.photos/200/300",
                featured:false
            },{
                name:"Test",
                image:"https://picsum.photos/200/300",
                featured:false
            },{
                name:"Test",
                image:"https://picsum.photos/200/300",
                featured:false
            },{
                name:"Test",
                image:"https://picsum.photos/200/300",
                featured:false
            },
    ]
</script>

<div class="w-full h-full p-2 flex flex-col gap-5">
	<div class="flex justify-between w-full">
        <input type="text" placeholder="Recherche" class="rounded-md p-2 w-96">
        <button class="hover:bg-slate-500 rounded-md bg-slate-600 w-52 text-white" >Ajouter une categorie</button>
    </div>
    <div class="flex flex-col overflow-scroll no-bar w-full shadow-inner h-full">
        <table class=" w-full " >
            <tr class="w-full text-center font-bold">
                <td>Nom</td>
                <td>Image</td>
                <td>Featured</td>
                <td>Actions</td>
            </tr>
            {#each categories as category}
               <tr class=" w-full text-xl text-center ">
                    <td>{category.name}</td>
                    <td class="flex justify-center" >
                        <img class=" w-10 h-10 " alt="image de la categorie" src={category.image} loading="lazy">
                    </td>
                    <td>{category.featured}</td>
                    <td></td>
               </tr> 
            {/each}
        </table>
    </div>
</div>
