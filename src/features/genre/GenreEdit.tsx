import { Box, Paper, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useParams } from "react-router-dom"
import {
  initialState as genreInitialState,
  useGetCategoriesInGenreQuery,
  useGetGenreQuery,
  useUpdateGenreMutation,
} from "./genreSlice"
import { useEffect, useState } from "react"
import type { Genre } from "../../types/Genre"
import { GenreForm } from "./components/GenreForm"

export function GenreEdit() {
  const { enqueueSnackbar } = useSnackbar()
  const id = useParams<{ id: string }>().id as string
  const { data: genre, isFetching } = useGetGenreQuery({ id })
  const [updateGenre, status] = useUpdateGenreMutation()
  const { data: categories } = useGetCategoriesInGenreQuery()
  const [genreState, setGenreState] = useState<Genre>(genreInitialState)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setGenreState(state => ({ ...state, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await updateGenre({
      id: genreState.id,
      name: genreState.name,
      categories_id: genreState.categories?.map(category => category.id),
    })
  }

  useEffect(() => {
    if (genre) {
      setGenreState(genre.data)
    }
  }, [genre])

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre updated successfully!", { variant: "success" })
    }
    if (status.error) {
      enqueueSnackbar("Failed to update genre!", { variant: "error" })
    }
  }, [enqueueSnackbar, status.error, status.isSuccess])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Genre</Typography>
          </Box>
        </Box>
      </Paper>
      <GenreForm
        genre={genreState}
        categories={categories?.data}
        isLoading={status.isLoading}
        isDisabled={isFetching || status.isLoading}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Box>
  )
}
