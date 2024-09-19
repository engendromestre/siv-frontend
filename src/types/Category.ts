export interface Results {
    meta: Meta
    data: Category[]
}

export interface Result {
    data: Category
    meta: Meta
}

export interface Category {
    id: string
    name: string
    description: string | null
    is_active: boolean
}

export interface Meta {
    currentPage: number
    perPage: number
    lastPage: number
    total: number
}

export interface CategoryParams {
    page?: number
    per_page?: number
    filter?: string
    is_active?: boolean
}