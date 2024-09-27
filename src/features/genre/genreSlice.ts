import type { Results } from "../../types/Category";
import type { Genre, GenreParams, GenrePayload, Result } from "../../types/Genre";
import { apiSlice } from "../api/apiSlice";


const endpointUrl = "/genres"

export const initialState = {
    id: "",
    name: "",
    isActive: false,
    categories_id: [],
    categories: [],
    is_active: true,
}

const parseQueryParams = (params: GenreParams) => {
    const query = new URLSearchParams();
    if (params.page) {
        query.append("page", params.page.toString());
    }

    if (params.per_page) {
        query.append("per_page", params.per_page.toString());
    }

    if (params.filter) {
        query.append("filter[name]", params.filter.toString());
    }

    if (params.is_active) {
        query.append("filter[type]", params.is_active.toString());
    }

    return query.toString();
}

const createGenreMutation = (genre: GenrePayload) => {
    return {
        url: endpointUrl,
        method: "POST",
        body: genre,
    }
}

const getCategories = () => {
    return `categories?all=true`
}

const getGenres = ({
    page = 1,
    per_page = 10,
    filter = "" }) => {
    const params = { page, per_page, filter }
    return `${endpointUrl}?${parseQueryParams(params)}`
}

const getGenre = ({ id }: { id: string }) => {
    return `${endpointUrl}/${id}`
}

const updateGenreMutation = (genre: GenrePayload) => {
    return {
        url: `${endpointUrl}/${genre.id}`,
        method: "PATCH",
        body: genre,
    }
}

const deleteGenreMutation = ({ id }: { id: string }) => {
    return {
        url: `${endpointUrl}/${id}`,
        method: "DELETE",
    }
}


export const genresApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCategoriesInGenre: query<Results, void>({
            query: getCategories,
        }),
        getGenres: query<Results, GenreParams>({
            query: getGenres,
            providesTags: ["Genres"],
        }),
        getGenre: query<Result, { id: string }>({
            query: getGenre,
            providesTags: ["Genres"],
        }),
        updateGenre: mutation<Genre, GenrePayload>({
            query: updateGenreMutation,
            invalidatesTags: ["Genres"],
        }),
        createGenre: mutation<Genre, GenrePayload>({
            query: createGenreMutation,
            invalidatesTags: ["Genres"],
        }),
        deleteGenre: mutation<void, { id: string }>({
            query: deleteGenreMutation,
            invalidatesTags: ["Genres"],
        }),
    }),
})

export const {
    useGetGenreQuery,
    useGetGenresQuery,
    useDeleteGenreMutation,
    useUpdateGenreMutation,
    useGetCategoriesInGenreQuery,
    useCreateGenreMutation
} = genresApiSlice;

