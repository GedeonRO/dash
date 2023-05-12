export type Category = {
    id: string,
    name: string,
    featured: boolen,
    image: string
}

export type SubCategory = {
    id: string,
    name: string,
    featured: boolean,
    image: string,
    category: string
}

export type Item = {
    id: string,
    name: string,
    featured: boolean,
    sub_category: string,
    schema: string
}

export type Brand = {
    id: string,
    name: string,
    image: string,
    featured: boolean
}

export type Slider = {
    id: string,
    name: string,
    image: string,
    featured: string
}
