import { Divider, List, ListItem } from "@material-ui/core"
import React from "react"
import { TodoListInterface } from "./interfaces"
import { useStyles } from "./todoCss"

import TodoItem from "./TodoItem"

const TodoList = (props: TodoListInterface) => {
    const css = useStyles()

    return (
        <List className={css.todoList}>
            {props.todos.map((todo) => (
                <ListItem key={todo.id} className={css.todoItemContainer}>
                    <div>
                        <TodoItem
                            todo={todo}
                            handleTodoUpdate={props.handleTodoUpdate}
                            handleTodoComplete={props.handleTodoComplete}
                            handleTodoRemove={props.handleTodoRemove}
                        />
                        <Divider />
                    </div>
                </ListItem>
            ))}
        </List>
    )
}

export default TodoList
