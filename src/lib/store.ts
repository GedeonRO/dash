import { writable } from "svelte/store";

export const loading_hidden = writable(true)

export const show_create_category = writable(false)
export const show_create_subcategory = writable(false)
export const show_create_brand = writable(false)
export const show_create_item = writable(false)
export const show_create_product = writable(false)

export const active_tab = writable("")

