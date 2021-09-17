import * as React from "react"
import { TextField, Button } from "@material-ui/core"
import { useStyles } from "../../pages/nookingSetup/nookingSetupCss"
import AddIcon from "@material-ui/icons/Add"
import { TodoContent, TodoFormInterface } from "./interfaces"
import { v4 as uuidv4 } from "uuid"
// import Theme

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
            user_id: "",
            todo_text: inputText,
            is_completed: false,
        }

        // Create new todo item
        props.handleTodoCreate(newTodo)

        // Reset the input field
        if (inputRef && inputRef.current) {
            inputRef.current.value = ""
        }
    }

    return (
        <form onSubmit={handleSubmit} className={css.todoForm}>
            <TextField
                variant="outlined"
                label="Add a todo"
                inputRef={inputRef}
                onChange={handleInputChange}
                color="secondary"
                className={css.todoFormTextField}
            />
            {/* <Button type="submit" color="secondary" variant="contained" className={css.todoAddButton}>
                <AddIcon />
            </Button> */}
        </form>
    )
}

export default TodoForm
