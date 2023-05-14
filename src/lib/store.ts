import { writable } from "svelte/store";

export const loading_hidden = writable(true)
export const show_create_category = writable(false)
export const show_create_subcategory = writable(false)
export const show_create_brand = writable(false)
export const show_create_item = writable(false)
export const show_create_product = writable(false)
export const active_tab = writable("")
export const show_edit_category = writable(false)
export const show_edit_subcategory = writable(false)
export const show_edit_brand = writable(false)
export const show_edit_item = writable(false)
export const show_edit_product = writable(false)
export const show_see_schema = writable(false)

export const current_schema = writable([]as Array<{name:string, type:string}>)
