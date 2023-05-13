import { writable } from "svelte/store";

export const cat_being_edited = writable({} as {name: string, image:string, featured:boolean})
export const subcat_being_edited = writable({} as {name: string, category:string, image:string, featured:boolean})
export const brand_being_edited = writable({} as {name: string, image:string, featured:boolean})
export const item_being_edited = writable({} as {name: string, subcategory:string, image:string, featured:boolean})
export const product_being_edited = writable({} as {name: string, image:string, featured:boolean})
