import type { Result, Results } from "../../types/CastMembers";
import { type CastMember, type CastMembersParams } from "../../types/CastMembers";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/cast-members";

export const initialState: CastMember = {
    id: "",
    name: "",
    type: 0,
}

const parseQueryParams = (params: CastMembersParams) => {
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

    if (params.type) {
        query.append("filter[type]", params.type.toString());
    }

    return query.toString();
}

const getCastMembersParams = ({
    page = 1,
    per_page = 10,
    filter = "" }) => {
    const params = { page, per_page, filter }

    return `${endpointUrl}?${parseQueryParams(params)}`
}

const getCastMember = ({ id }: { id: string }) => {
    return {
        url: `${endpointUrl}/${id}`,
        method: "GET",
    }
}

const deleteCastMember = ({ id }: { id: string }) => {
    return {
        url: `${endpointUrl}/${id}`,
        method: "DELETE",
    }
}

const createCastMember = (castMember: CastMember) => {
    const createCastMember = {
        ...castMember,
        type: Number(castMember.type)
    }
    return {
        url: endpointUrl,
        method: "POST",
        body: createCastMember,
    }
}

const updateCastMember = (castMember: CastMember) => {
    const updateCastMember = {
        ...castMember,
        type: Number(castMember.type)
    }
    return {
        url: `${endpointUrl}/${castMember.id}`,
        method: "PATCH",
        body: updateCastMember,
    }
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCastMembers: query<Results, CastMembersParams>({
            query: getCastMembersParams,
            providesTags: ["CastMembers"],
        }),
        getCastMember: query<Result, { id: string }>({
            query: getCastMember,
            providesTags: ["CastMembers"],
        }),
        deleteCastMember: mutation<Result, { id: string }>({
            query: deleteCastMember,
            invalidatesTags: ["CastMembers"],
        }),
        createCastMember: mutation<Result, CastMember>({
            query: createCastMember,
            invalidatesTags: ["CastMembers"],
        }),
        updateCastMember: mutation<Result, CastMember>({
            query: updateCastMember,
            invalidatesTags: ["CastMembers"],
        })
    }),
});

export const {
    useGetCastMembersQuery,
    useGetCastMemberQuery,
    useCreateCastMemberMutation,
    useUpdateCastMemberMutation,
    useDeleteCastMemberMutation,
} = castMembersApiSlice;
