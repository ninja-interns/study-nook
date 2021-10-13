import React from "react"
import { TodoListInterface } from "../interfaces"
import { IconButton, List, ListItem, Paper, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

/**
 * * TODO LIST (FORM) COMPONENT
 * * Displays the users current todo list - The user can update and delete these todos
 */
const TodoListForm = (props: TodoListInterface) => {
	if (props.todos === undefined || null) return null // Return nothing if there are no todos in the list

	return (
		<List
			sx={{
				height: 380,
				overflowY: "auto",
				width: "100%",
				m: 0,
				p: 0,

				// Scrollbar styling
				"&::-webkit-scrollbar": {
					width: "16px",
				},
				"&::-webkit-scrollbar-track": {
					backgroundColor: "#e4e4e4",
					borderRadius: "100px",
				},
				"&::-webkit-scrollbar-thumb": {
					border: "5px solid transparent",
					borderRadius: "100px",
					backgroundColor: "#8070d4",
					backgroundClip: "content-box",
				},
			}}
		>
			{/* Itterate through the todos array and load each todo item */}
			{props.todos.map((todo) => {
				const labelId = `checkbox-list-label-${todo.todoText}`
				return (
					<Paper
						elevation={2}
						sx={{
							// height: 15,
							// width: "100%",
							m: 2,
							p: 2,
						}}
					>
						<ListItem key={todo.id} dense>
							<TextField
								variant="standard"
								fullWidth
								id={labelId}
								defaultValue={todo.todoText}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, todo)}
								error={todo.todoText === ""}
							/>
							<IconButton edge="end" aria-label="delete" onClick={() => props.handleTodoRemove(todo)}>
								<DeleteIcon />
							</IconButton>
						</ListItem>
					</Paper>
				)
			})}
		</List>
	)
}

export { TodoListForm }
