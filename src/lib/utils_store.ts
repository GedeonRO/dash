import { writable } from "svelte/store";

export const cat_being_edited = writable({} as {name: string, featured:boolean, id: string})
export const subcat_being_edited = writable({} as {name: string, category:string, featured:boolean, id: string})
export const brand_being_edited = writable({} as {name: string, featured:boolean, id: string})
export const item_being_edited = writable({} as {name: string, subcategory:string, featured:boolean, id: string})
export const product_being_edited = writable({} as {name: string, featured:boolean, id: string})
