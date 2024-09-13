export interface Results {
    data: CastMember[]
    meta: Meta
}

export interface Result {
    data: CastMember
    meta: Meta
}

export interface CastMember {
    id: string
    name: string
    type: number
}

export interface Meta {
    currentPage: number
    perPage: number
    lastPage: number
    total: number
}

export interface CastMembersParams {
    page?: number
    per_page?: number
    filter?: string
    type?: number
}

export interface PaginationModel {
    page: number
    pageSize: number
}

