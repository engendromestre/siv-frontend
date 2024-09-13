import DeleteIcon from "@mui/icons-material/Delete"
import { Box, IconButton, Typography } from "@mui/material"
import type {
  GridFilterModel} from "@mui/x-data-grid";
import {
  DataGrid,
  GridToolbar,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import type { Results } from "../../../types/Category"

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

export function CategoryTable({
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
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${row.id}`}
      >
        <Typography color="primary">{row.value}</Typography>
      </Link>
    )
  }

  const renderIsActiveCell = (row: GridRenderCellParams<Boolean>) => {
    return (
      <Typography color={row.value ? "primary" : "secondary"}>
        {row.value ? "Active" : "No active"}
      </Typography>
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
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "is_active",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    { field: "created_at", headerName: "Created At", flex: 1 },
    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      type: "string",
      renderCell: renderActionsCell,
    },
  ]

  const mapDataToGridRows = (data: Results) => {
    const { data: categories } = data
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      // created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
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
