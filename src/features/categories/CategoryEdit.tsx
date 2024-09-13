import { Box, Paper, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useGetCategoryQuery, useUpdateCategoryMutation } from "./categorySlice"
import type { Category } from "../../types/Category"
import { CategoryForm } from "./components/CategoryForm"

const CategoryEdit: React.FC = () => {
  const id = useParams().id || ""
  const { data: category, isFetching } = useGetCategoryQuery({ id })
  const [updateCategoryQuery, status] = useUpdateCategoryMutation()
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: true,
  })
  const { enqueueSnackbar } = useSnackbar()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await updateCategoryQuery(categoryState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategoryState({ ...categoryState, [name]: value })
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setCategoryState({ ...categoryState, [name]: checked })
  }

  useEffect(() => {
    if (category) {
      setCategoryState(category.data)
    }
  }, [category])

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Category updated successfully!", { variant: "success" })
    }
    if (status.error) {
      enqueueSnackbar("Error updating category!", { variant: "error" })
    }
  }, [enqueueSnackbar, status.error, status.isSuccess])
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleToggle={handleToggle}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  )
}

export default CategoryEdit
