import * as React from "react"
import { TextField, ThemeProvider, Button } from "@material-ui/core"
import { useStyles, theme } from "./todoCss"
import AddIcon from "@material-ui/icons/Add"
import { TodoContent, TodoFormInterface } from "./interfaces"
import { v4 as uuidv4 } from "uuid"

const TodoForm = (props: TodoFormInterface) => {
    const css = useStyles()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [inputText, setInputText] = React.useState("")

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputText(event.target.value)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        // Prepare new todo
        const newTodo: TodoContent = {
            id: uuidv4(),
            userId: null, // need to get this info from logged in user
            text: inputText,
            isCompleted: false,
        }

        // Create new todo item
        props.handleTodoCreate(newTodo)

        // Reset the input field
        if (inputRef && inputRef.current) {
            inputRef.current.value = ""
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit} className={css.inputForm}>
                <TextField className={css.textField} variant="filled" label="Add a todo" inputRef={inputRef} onChange={handleInputChange} color="secondary" />
                <Button type="submit" className={css.addTodoButton} color="secondary" variant="contained">
                    <AddIcon />
                </Button>
            </form>
        </ThemeProvider>
    )
}

export default TodoForm
