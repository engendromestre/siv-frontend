import { Typography } from "@mui/material"
import { Box, ThemeProvider } from "@mui/system"
import { SnackbarProvider } from "notistack"
import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { Layout } from "./components/Layout"
import { appTheme } from "./config/theme"
import { CastMembersCreate } from "./features/cast/CastMembersCreate"
import { CastMembersEdit } from "./features/cast/CastMembersEdit"
import { CastMembersList } from "./features/cast/CastMembersList"
import { CategoryCreate } from "./features/categories/CategoryCreate"
import { CategoryEdit } from "./features/categories/CategoryEdit"
import { CategoryList } from "./features/categories/CategoryList"
import { GenreCreate } from "./features/genre/GenreCreate"
import { GenreEdit } from "./features/genre/GenreEdit"
import { GenreList } from "./features/genre/GenreList"

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            backgroundColor: theme => theme.palette.background.paper,
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<CastMembersList />} />
              {/* Category */}
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/create" element={<CategoryCreate />} />
              <Route path="/categories/edit/:id" element={<CategoryEdit />} />
              {/* Cast Members */}
              <Route path="/cast-members" element={<CastMembersList />} />
              <Route path="/cast-members/create" element={<CastMembersCreate />} />
              <Route path="/cast-members/edit/:id" element={<CastMembersEdit />} />
               {/* Genre */}
               <Route path="/genres" element={<GenreList />} />
               <Route path="/genres/create" element={<GenreCreate />} />
               <Route path="/genres/edit/:id" element={<GenreEdit />} />
              <Route
                path="*"
                element={
                  <Box sx={{ color: "white" }}>
                    <Typography variant="h2" component="h2">
                      Página não encontrada
                    </Typography>
                  </Box>
                }
              />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
