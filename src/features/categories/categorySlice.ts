import type { Category, CategoryParams, Result, Results } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

const getCategoriesParams = ({
    page = 1,
    per_page = 10,
    filter = "" }) => {
    const params = { page, per_page, filter }

    return `${endpointUrl}?${parseQueryParams(params)}`
}

const deleteCategoryMutation = (category: Category) => {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: "DELETE"
    }
}

const createCategoryMutation = (category: Category) => {
    return {
        url: endpointUrl,
        method: "POST",
        body: category
    }
}

const updateCategoryMutation = (category: Category) => {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: "PATCH",
        body: category
    }
}

const getCategoryQuery = ({ id }: { id: string }) => {
    return `${endpointUrl}/${id}`;
}

const endpointUrl = "/categories";

const parseQueryParams = (params: CategoryParams) => {
    const queryParams = new URLSearchParams()
    if (params.page) {
        queryParams.append("page", params.page.toString())
    }

    if (params.per_page) {
        queryParams.append("per_page", params.per_page.toString())
    }

    if (params.filter) {
        queryParams.append("filter", params.filter.toString())
    }

    if (params.is_active) {
        queryParams.append("is_active", params.is_active.toString())
    }

    return queryParams.toString()
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCategories: query<Results, CategoryParams>({
            query: getCategoriesParams,
            providesTags: ["Categories"],
        }),
        getCategory: query<Result, { id: string }>({
            query: getCategoryQuery,
            providesTags: ["Categories"],
        }),
        createCategory: mutation<Result, Category>({
            query: createCategoryMutation,
            invalidatesTags: ["Categories"],
        }),
        updateCategory: mutation<Result, Category>({
            query: updateCategoryMutation,
            invalidatesTags: ["Categories"],
        }),
        deleteCategory: mutation<Result, { id: string }>({
            query: deleteCategoryMutation,
            invalidatesTags: ["Categories"],
        })
    })
});

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useDeleteCategoryMutation,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
} = categoriesApiSlice;

