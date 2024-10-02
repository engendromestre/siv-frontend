import DeleteIcon from "@mui/icons-material/Delete"
import { Box, IconButton, Typography } from "@mui/material"
import type {
    GridColDef,
    GridRenderCellParams} from "@mui/x-data-grid";
import {
    DataGrid,
    GridToolbar,
    type GridFilterModel,
} from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import type { Results } from "../../../types/Genre"

interface PaginationModel {
  page: number
  pageSize: number
}

type Props = {
  data: Results | undefined
  isFetching: boolean
  paginationModel: PaginationModel
  pageSizeOptions?: number[]
  onPaginationModelChange: (model: PaginationModel) => void
  handleFilterChange: (filter: GridFilterModel) => void
  handleDelete: (id: string) => void
}

export function GenreTable({
  data,
  isFetching,
  paginationModel,
  pageSizeOptions,
  onPaginationModelChange,
  handleFilterChange,
  handleDelete,
}: Props) {
  const componentProps = {
    toolbar: {
      showQuickFilter: true,
    },
  }
  const renderNameCell = (row: GridRenderCellParams) => {
    return (
      <Link style={{ textDecoration: "none" }} to={`/genres/edit/${row.id}`}>
        <Typography color="primary">{row.value}</Typography>
      </Link>
    )
  }
  const renderActionsCell = (params: GridRenderCellParams) => {
    return (
      <div>
        <IconButton
          color="secondary"
          /* v8 ignore next */
          onClick={() => handleDelete(params.row.id)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    )
  }
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      type: "string",
      renderCell: renderActionsCell,
    },
  ]
  const mapDataToGridRows = (data: Results) => {
    const { data: genres } = data
    return genres.map(genre => ({
      id: genre.id,
      name: genre.name,
      categories: genre.categories,
    }))
  }
  const rows = data ? mapDataToGridRows(data) : []
  const rowCount = data?.meta.total ?? 0
  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        {...data}
        rows={rows}
        pagination
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        loading={isFetching}
        slotProps={componentProps}
        filterMode="server"
        rowCount={rowCount}
        pageSizeOptions={pageSizeOptions}
        disableColumnFilter={true}
        disableDensitySelector={true}
        disableColumnSelector={true}
        disableRowSelectionOnClick={true}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        onFilterModelChange={handleFilterChange}
      ></DataGrid>
    </Box>
  )
}
