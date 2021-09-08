import * as React from "react"
import { Checkbox, IconButton, TextField } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { useStyles } from "./todoCss"

import { TodoItemInterface } from "./interfaces"

const TodoItem = (props: TodoItemInterface) => {
    const css = useStyles()

    return (
        <div className={css.todoItem}>
            <Checkbox onClick={() => props.handleTodoComplete(props.todo.id)} className={css.todoCheckbox} />
            <TextField
                className={css.todoInput}
                required
                value={props.todo.text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.id)}
                error={props.todo.text === ""}
                helperText={props.todo.text === "" ? "Empty field!" : " "}
            />
            <IconButton className={css.todoDelete} aria-label="delete" onClick={() => props.handleTodoRemove(props.todo.id)}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
export default TodoItem
