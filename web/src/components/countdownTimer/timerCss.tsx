import { makeStyles } from "@material-ui/styles"
import { createTheme } from "@material-ui/core/styles"

export const useStyles = makeStyles({
    formControl: {},

    addTodoButton: {
        width: "5%",
        height: "62%",
        margin: "1rem",
    },

    todoItemContainer: {
        // width: "100%",
        // position: "relative",
        backgroundColor: "#c38d9e",
    },

    todoList: {
        overflow: "auto",
        position: "relative",
        // width: "150%",
    },

    todoItem: {
        padding: 0,
        margin: 0,
        display: "flex",
        alignItems: "center",
    },

    todoCheckbox: {
        paddingRight: 20,
    },

    todoInput: {
        width: 200,
        border: 0,
        paddingTop: 15,
    },

    todoDelete: {
        paddingLeft: 20,
    },
})

export const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: "#9c707e",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            // light: "#0066ff",
            main: "#e8a87c",
            contrastText: "#ffcc00", // this changes the text color
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,

        tonalOffset: 0.2, // this changes the hover colour
    },
})
