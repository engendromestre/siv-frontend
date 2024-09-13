import { createTheme } from "@mui/material"
import { ptBR } from "@mui/x-data-grid/locales"

export const appTheme = createTheme(
    {
        palette: {
            mode: "dark",
            primary: { main: "#f5f5f1" },
            secondary: { main: "#e50914" },
            text: { primary: "#f5f5f1" },
        },
    },
    ptBR,
)

