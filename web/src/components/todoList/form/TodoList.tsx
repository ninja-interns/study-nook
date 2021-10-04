import React from "react"
import { TodoListInterface } from "../interfaces"
import { Divider, IconButton, List, ListItem, Paper, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

/**
 * * TODO LIST (FORM) COMPONENT
 * * Displays the users current todo list - The user can update and delete these todos
 */
const TodoListForm = (props: TodoListInterface) => {
	if (props.todos === undefined || null) return null // Return nothing if there are no todos in the list

	return (
		<Paper
			elevation={1}
			sx={{
				mt: 1,
			}}
		>
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
					const labelId = `checkbox-list-label-${todo.todoText}`
					return (
						<Paper
							elevation={2}
							sx={{
								m: 1,
							}}
						>
							<ListItem key={todo.id}>
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
		</Paper>
	)
}

export { TodoListForm }
