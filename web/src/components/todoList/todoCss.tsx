import { makeStyles } from "@material-ui/styles"
import { createTheme } from "@material-ui/core/styles"

export const useStyles = makeStyles({
    addTodoButton: {
        variant: "contained",
    },
})

export const theme = createTheme({
    palette: {
        background: {
            default: "#222222",
        },
        // type: "dark",
        primary: {
            main: "#41b3a3",
        },
        secondary: {
            main: "#c38d9e",
        },
    },
})
