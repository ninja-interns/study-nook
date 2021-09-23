//! Explanation of component

import React from "react"
import { ListItemButton, IconButton, List, ListItem, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { TodoListFormInterface } from "./interfaces"

const TodoListForm = (props: TodoListFormInterface) => {
	// Return nothing if there are no todos
	if (props.todos === undefined || null) return null

	return (
		<List
			sx={{
				height: "15rem",
				overflow: "auto",
				width: "100%",
				backgroundColor: "grey",
			}}
		>
			{/* Itterate through the todos array and load each todo item */}
			{props.todos.map((todo) => {
				const labelId = `checkbox-list-label-${todo.todo_text}`

				return (
					<ListItem key={todo.id}>
						<ListItemButton role={undefined} dense>
							<TextField
								id={labelId}
								variant="standard"
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
	)
}

export default TodoListForm
