import { Box, Paper, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import type React from "react"
import { useEffect, useState } from "react"
import type { Genre } from "../../types/Genre"
import { GenreForm } from "./components/GenreForm"
import {
  initialState as genreInitialState,
  useCreateGenreMutation,
  useGetCategoriesInGenreQuery,
} from "./genreSlice"

export const GenreCreate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { data: categories } = useGetCategoriesInGenreQuery();
  const [createGenre, status] = useCreateGenreMutation()
  const [genreState, setGenreState] = useState<Genre>(genreInitialState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setGenreState(state => ({ ...state, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await createGenre({
      id: genreState.id,
      name: genreState.name,
      categories_id: genreState.categories?.map((category) => category.id)
    })
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre create successfully!", { variant: "success" })
    }
    if (status.error) {
      enqueueSnackbar("Failed to create genre!", { variant: "error" })
    }
  }, [enqueueSnackbar, status.error, status.isSuccess])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>
      </Paper>
      <GenreForm
        genre={genreState}
        categories={categories?.data}
        isLoading={status.isLoading}
        isDisabled={status.isLoading}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Box>
  )
}
