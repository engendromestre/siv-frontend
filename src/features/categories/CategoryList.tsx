import { Box, Button } from "@mui/material"
import type { GridFilterModel } from "@mui/x-data-grid"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice"
import { CategoryTable } from "./components/CategoryTable"

export const CategoryList = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [options, setOptions] = useState({
    model: {
      page: 0,
      pageSize: 10,
    },
    filter: "",
    type: null,
  })

  const { data, isFetching, error } = useGetCategoriesQuery({
    page: options.model.page + 1,
    per_page: options.model.pageSize,
    filter: options.filter,
  })

  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation()

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory({ id })
  }

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
      return setOptions(prevOptions => ({ ...prevOptions, filter }))
    }
    return setOptions(prevOptions => ({ ...prevOptions, filter: "" }))
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted successfully!", { variant: "success" })
    }
    if (deleteCategoryStatus.isError) {
      enqueueSnackbar("Error deleting category!", { variant: "error" })
    }
    if (error) {
      enqueueSnackbar("Error fetching category!", { variant: "error" })
    }
  }, [deleteCategoryStatus, enqueueSnackbar, error])

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          sx={{ mb: "1rem" }}
        >
          New Category
        </Button>
      </Box>
      <CategoryTable
        data={data}
        isFetching={isFetching}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={options.model}
        onPaginationModelChange={handlePaginationChange}
        handleFilterChange={handleFilterChange}
        handleDelete={handleDeleteCategory}
      />
    </Box>
  )
}
