<script>
  import "../app.css";
  import Appbar from "../components/Appbar.svelte";
  import Drawer from "../components/Drawer.svelte";
</script>

<main class=" w-full h-screen " >
    <Appbar/>
    <div class="p-2 h-[93%] w-full flex">
        <Drawer/>
        <slot />
    </div>
</main>
