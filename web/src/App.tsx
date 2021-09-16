import React from "react"
import { ContextContainer } from "./contexts/ContextContainer"
import Routes from "./routes/Routes"
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
// import { theme } from "./contexts/themeContext"
import TodoListApp from "./components/todoList"
import TimerApp from "./components/countdownTimer"
import {} from "@material-ui/core/styles"

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
                {/* <TodoListApp />
                <TimerApp /> */}
            </ContextContainer.Provider>
        </ThemeProvider>
    )
}
export default App
