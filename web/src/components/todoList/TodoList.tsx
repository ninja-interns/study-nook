import React from "react"
import { ListItemButton, IconButton, List, ListItem, ListItemIcon, Checkbox, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { TodoListInterface } from "./interfaces"
import { useStyles } from "../../pages/nookingSetup/nookingSetupCss"

const TodoList = (props: TodoListInterface) => {
    const css = useStyles()

    if (props.todos === null) return null

    return (
        <List className={css.todoList}>
            {props.todos.map((todo) => {
                const labelId = `checkbox-list-label-${todo.todo_text}`

                return (
                    <ListItem key={todo.id}>
                        <ListItemButton role={undefined} onClick={() => props.handleTodoComplete(todo)} dense>
                            <ListItemIcon>
                                <Checkbox edge="start" />
                            </ListItemIcon>
                            <TextField
                                id={labelId}
                                variant="standard"
                                // className={css.todoInput}
                                required
                                value={todo.todo_text}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, todo)}
                                error={todo.todo_text === ""}
                                // helperText={todo.todo_text === "" ? "Empty field!" : " "}
                            />
                        </ListItemButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => props.handleTodoRemove(todo)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                )
            })}
        </List>

        // <List>

        //             // const labelId = `checkbox-list-label-${todo.todo_text}`;

        //             // return (
        //             <ListItem
        //                 key={todo.id}
        //                 secondaryAction={
        //                     <IconButton edge="end" aria-label="delete">
        //                         <DeleteIcon />
        //                     </IconButton>
        //                 }
        //                 disablePadding
        //             >

        //     <Checkbox onClick={() => props.handleTodoComplete(props.todo)} className={css.todoCheckbox} />
        //     <TextField
        //         // id="filled"
        //         className={css.todoInput}
        //         required
        //         value={props.todo.todo_text}
        //         onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo)}
        //         error={props.todo.todo_text === ""}
        //         helperText={props.todo.todo_text === "" ? "Empty field!" : " "}
        //     />
        //     <IconButton edge="end" className={css.todoDelete} aria-label="delete" onClick={() => props.handleTodoRemove(props.todo)}>
        //         <DeleteIcon />
        //     </IconButton>

        //             </ListItem>
        //             // );
        //         ))}
        // </List>
    )
}

export default TodoList
