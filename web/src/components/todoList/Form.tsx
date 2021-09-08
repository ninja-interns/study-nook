import React from "react"
import { TextField, IconButton } from "@material-ui/core"
import { useStyles, theme } from "./todoCss"
import { ThemeProvider } from "@material-ui/core/styles"
import AddBoxIcon from "@material-ui/icons/AddBox"

const Form = () => {
    const css = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <form>
                <TextField color="primary" variant="outlined" label="Add a todo" />
                {/* Chamge this to be an icon button */}
                <IconButton className={css.addTodoButton} color="secondary">
                    {/* <AddBoxIcon /> */}+
                </IconButton>
            </form>
        </ThemeProvider>
    )
}

export default Form
