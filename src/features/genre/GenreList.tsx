import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { GenreTable } from "./components/GenreTable"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useDeleteGenreMutation, useGetGenresQuery } from "./genreSlice"
import type { GridFilterModel } from "@mui/x-data-grid"

export const GenreList = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [options, setOptions] = useState({
    model: {
      page: 0,
      pageSize: 10,
    },
    filter: "",
    type: null,
  })

  const { data, isFetching, error } = useGetGenresQuery({
    page: options.model.page + 1,
    per_page: options.model.pageSize,
    filter: options.filter,
  })

  const [deleteGenre, deleteGenreStatus] = useDeleteGenreMutation()

  const handleDeleteGenre = async (id: string) => {
    await deleteGenre({ id })
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
    if (deleteGenreStatus.isSuccess) {
      enqueueSnackbar("Genre deleted successfully!", { variant: "success" })
    }
    if (error) {
      enqueueSnackbar("Error fetching genres!", { variant: "error" })
    }
  }, [deleteGenreStatus, enqueueSnackbar, error])

  if (error) {
    return <Typography> Error fetching genres </Typography>
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/genres/create"
          sx={{ mb: "1rem" }}
        >
          New Genre
        </Button>
      </Box>
      <GenreTable
        data={data}
        isFetching={isFetching}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={options.model}
        onPaginationModelChange={handlePaginationChange}
        handleFilterChange={handleFilterChange}
        handleDelete={handleDeleteGenre}
      />
    </Box>
  )
}
