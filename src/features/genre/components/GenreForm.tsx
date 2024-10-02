import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material"
import { Link } from "react-router-dom"
import type { Category } from "../../../types/Category"

type Props = {
  genre: any
  categories?: Category[]
  isLoading?: boolean
  isDisabled?: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const GenreForm = ({
  genre,
  categories,
  isLoading = false,
  isDisabled = false,
  handleSubmit,
  handleChange,
}: Props) => {
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
                value={genre.name}
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
            <FormGroup>
              <FormLabel>Categories</FormLabel>
              <Autocomplete
                multiple
                id="tags-standard"
                options={categories || []}
                getOptionLabel={option => option.name}
                loading={isLoading}
                value={genre.categories}
                disabled={isDisabled || isLoading || !categories}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
                onChange={(_, value) => {
                  handleChange({
                    target: {
                      name: "categories",
                      value,
                    },
                  } as any)
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Multiple values"
                    placeholder="Categories"
                  />
                )}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/genres">
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
