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
    category: string,
    category_data:{
        id: string,
        name: string
    }
}

export type Item = {
    id: string,
    name: string,
    featured: boolean,
    image: string,
    subcategory: string,
    schema: string,
    subcategory_data:{
        id: string,
        name: string
    }
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
