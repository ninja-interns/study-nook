import React from "react"
import { ContextContainer } from "./contexts/ContextContainer"
import Routes from "./routes/Routes"
import { ThemeProvider } from "@material-ui/styles"
import { theme } from "./contexts/themeContext"
import TodoListApp from "./components/todoList"

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ContextContainer.Provider>
                {/* <Routes /> */}
                <TodoListApp />
            </ContextContainer.Provider>
        </ThemeProvider>
    )
}
export default App
