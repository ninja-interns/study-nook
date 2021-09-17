import React from "react"
import { ContextContainer } from "./contexts/ContextContainer"
import Routes from "./routes/Routes"
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
// import { theme } from "./contexts/themeContext"

const theme = createTheme({
    palette: {
        type: "dark",
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ContextContainer.Provider>
                <Routes />
            </ContextContainer.Provider>
        </ThemeProvider>
    )
}
export default App
