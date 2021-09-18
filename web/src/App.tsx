import React from "react"
import { ContextContainer } from "./contexts/ContextContainer"
import Routes from "./routes/Routes"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
})

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <ContextContainer.Provider>
                <Routes />
            </ContextContainer.Provider>
        </ThemeProvider>
    )
}
export default App
