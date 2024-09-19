import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from "@mui/material"
import { Link } from "react-router-dom"
import type { Category } from "../../../types/Category"

type Props = {
  category: Category
  isDisabled?: boolean
  isLoading?: boolean
  // istanbul ignore next
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function CategoryForm({
  category,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
  handleToggle,
}: Props) {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="Name"
                name="name"
                value={category.name}
                disabled={isDisabled}
                onChange={handleChange}
                required
                inputProps={{
                  "data-testid": "name",
                }}
              ></TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="Description"
                name="description"
                value={category.description}
                disabled={isDisabled}
                onChange={handleChange}
                required
                inputProps={{
                  "data-testid": "description",
                }}
              ></TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="is_active"
                    color="secondary"
                    onChange={handleToggle}
                    checked={category.is_active}
                    inputProps={{
                      "aria-label": "controlled"
                    }}
                    data-testid="is_active"
                    data-checked={category.is_active}
                  />
                }
                label="Active"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/categories">
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isDisabled || isLoading}
              >
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
