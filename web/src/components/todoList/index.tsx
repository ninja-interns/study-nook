import React from "react"
import Form from "./Form"
import { useStyles, theme } from "./todoCss"
import { ThemeProvider } from "@material-ui/core/styles"

function TodoListApp() {
    const css = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Form />
            </div>
        </ThemeProvider>
    )
}

export default TodoListApp
