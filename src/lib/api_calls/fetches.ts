import { loading_hidden } from "$lib/store"

export async function fetch_categories(){
    loading_hidden.set(true)
    const api_url = "https://goodnessunit.onrender.com/category"
    const res = await fetch(api_url)

}
