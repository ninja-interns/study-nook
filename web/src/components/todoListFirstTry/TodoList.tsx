// Import dependencies
import * as React from "react"

//Import Material UI Dependencies
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import TextField from "@material-ui/core/TextField"
import Divider from "@material-ui/core/Divider"

// Import TodoItem
import TodoItem from "./TodoItem"

// Import interfaces
import { TodoListInterface } from "./interfaces"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            maxWidth: 360,
            backgroundColor: "#eceff1",
        },
    }),
)

// TodoList component
const TodoList = (props: TodoListInterface) => {
    const classes = useStyles()

    return (
        <div className="todo-list">
            <List className={classes.root}>
                {props.todos.map((todo) => (
                    <ListItem key={todo.id}>
                        <TodoItem
                            todo={todo}
                            handleTodoUpdate={props.handleTodoUpdate}
                            handleTodoRemove={props.handleTodoRemove}
                            handleTodoComplete={props.handleTodoComplete}
                            handleTodoBlur={props.handleTodoBlur}
                        />
                        <Divider />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default TodoList
