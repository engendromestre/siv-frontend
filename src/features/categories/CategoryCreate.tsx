import { Box, Paper, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useCreateCategoryMutation } from "./categorySlice"
import { CategoryForm } from "./components/CategoryForm"
import type { Category } from "../../types/Category"

export const CategoryCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [createCategory, status] = useCreateCategoryMutation()
  const [isDisabled, setIsdisabled] = useState(false)
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: true,
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await createCategory(categoryState)
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
    if (status.isSuccess) {
      enqueueSnackbar("Category create successfully!", { variant: "success" })
      setIsdisabled(true)
    }
    if (status.error) {
      enqueueSnackbar("Failed to create category!", { variant: "error" })
    }
  }, [enqueueSnackbar, status.error, status.isSuccess])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleToggle={handleToggle}
          isDisabled={isDisabled}
          isLoading={false}
        />
      </Paper>
    </Box>
  )
}
