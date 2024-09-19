import { Box, Button } from "@mui/material"
import type { GridFilterModel } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  useGetCastMembersQuery,
  useDeleteCastMemberMutation,
} from "./castMembersSlice"
import { useSnackbar } from "notistack"
import { CastMembersTable } from "./components/CastMembersTable"

export const CastMembersList = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [options, setOptions] = useState({
    model: {
      page: 0,
      pageSize: 10,
    },
    filter: "",
    type: null,
  })

  const { data, isFetching, error } = useGetCastMembersQuery({
    page: options.model.page + 1,
    per_page: options.model.pageSize,
    filter: options.filter,
  })
  
  const [deleteCastMember, deleteCastMemberStatus] =
    useDeleteCastMemberMutation()

  const handlePaginationChange = (model: {
    page: number
    pageSize: number
  }) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      model: {
        ...prevOptions.model,
        page: model.page,
        pageSize: model.pageSize,
      },
    }))
  }

  const handleFilterChange = (filterModel: GridFilterModel) => {
    if (filterModel.quickFilterValues?.length) {
      const filter = filterModel.quickFilterValues.join("")
      return setOptions(prevOptions => ({...prevOptions, filter }))
    }
    return setOptions(prevOptions => ({...prevOptions, filter: "" }))
  }

  const handleDeleteCastMember = async (id: string) => {
    await deleteCastMember({ id })
  }

  useEffect(() => {
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar("Cast Member deleted", { variant: "success" })
    }
    if (error) {
      enqueueSnackbar("Cast Member not deleted", { variant: "error" })
    }
  }, [error, deleteCastMemberStatus, enqueueSnackbar])

  if (error) {
    return <div>Error fetching cast members</div>
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cast-members/create"
          sx={{ mb: "1rem" }}
        >
          New Cast Member
        </Button>
      </Box>
      <CastMembersTable
        data={data}
        isFetching={isFetching}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={options.model}
        onPaginationModelChange={handlePaginationChange}
        handleFilterChange={handleFilterChange}
        handleDelete={handleDeleteCastMember}
      />
    </Box>
  )
}
