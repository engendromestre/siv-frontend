import DeleteIcon from "@mui/icons-material/Delete"
import { Box, IconButton, Typography } from "@mui/material"
import type { GridFilterModel } from "@mui/x-data-grid"
import {
  DataGrid,
  GridToolbar,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import type { Results, PaginationModel } from "../../../types/CastMembers"

type Props = {
  data: Results | undefined
  isFetching: boolean
  paginationModel: PaginationModel
  pageSizeOptions?: number[]
  onPaginationModelChange: (model: PaginationModel) => void
  handleFilterChange: (filter: GridFilterModel) => void
  handleDelete: (id: string) => void
}

export function CastMembersTable({
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
        to={`/cast-members/edit/${row.id}`}
      >
        <Typography color="primary">{row.value}</Typography>
      </Link>
    )
  }

  const renderTypeCell = (row: GridRenderCellParams<Boolean>) => {
    return (
      <Typography color="primary">
        {row.value === 1 ? "Diretor" : "Ator"}
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
      flex: 1,
      headerName: "Name",
      renderCell: renderNameCell,
    },
    {
      field: "type",
      flex: 1,
      headerName: "Type",
      renderCell: renderTypeCell,
    },
    { field: "created_at", headerName: "Created At", flex: 1 },
    {
      field: "id",
      flex: 1,
      headerName: "Actions",
      renderCell: renderActionsCell,
      type: "string",
    },
  ]

  const mapDataToGridRows = (data: Results) => {
    const { data: castMembers } = data
    return castMembers.map(castMember => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
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
