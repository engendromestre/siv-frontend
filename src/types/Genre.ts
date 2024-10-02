export interface Genres {
    data: Genre[]
    meta: Meta
}

export interface Result {
    data: Genre
    meta: Meta
}

export interface Genre {
    id: string
    name: string
    categories_id: string[]
    categories?: Category[]
    is_active: boolean
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

export interface GenreParams {
    page?: number;
    per_page?: number;
    filter?: string;
    is_active?: boolean;
}

export interface GenrePayload {
    id: string;
    name: string;
    categories_id?: string[];
}