import { Card, Checkbox, Divider, List, ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material"
import * as React from "react"
import { TodoContent } from "../interfaces"

/**
 * * TODO LIST COMPONENT
 * * Renders the todo list stored in the database
 * * Updates the todo item to completed or not completed when the user clicks the checkbox
 * TODO: Sort the todos - completed at the bottom of the list
 */
const TodoList = () => {
	const [todos, setTodos] = React.useState<TodoContent[]>([])

	//* Requests the API to return todos stored in the database - Runs once on render
	React.useEffect(() => {
		async function getTodoList() {
			const response = await fetch("http://localhost:8080/api/get_todos")
			if (response.ok) {
				const data: TodoContent[] = await response.json()
				setTodos(data)
			} else {
				console.error("Error fetching todo list: " + response.statusText)
			}
		}
		getTodoList()
	}, [])

	//* Imports a todo and updates its checkbox and the completion status in the database
	async function handleTodoComplete(todoItem: TodoContent) {
		// Updates the todo to display as completed / not completed
		const newTodosState: TodoContent[] = [...todos]
		newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!.isCompleted = !newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!
			.isCompleted
		setTodos(newTodosState)

		// Sends request to the API to update the completion status of the todo
		await fetch("http://localhost:8080/api/update_todo", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todoItem),
		})
	}

	return (
		<Card>
			<List
				sx={{
					height: "20rem",
					overflow: "auto",
				}}
			>
				{todos.map((todo) => {
					return (
						<>
							<ListItem
								key={todo.id}
								sx={{
									p: 0,
								}}
							>
								<ListItemButton role={undefined} onClick={() => handleTodoComplete(todo)} dense>
									<ListItemIcon>
										<Checkbox checked={todo.isCompleted} edge="start" />
									</ListItemIcon>
									<Typography>{todo.todoText}</Typography>
								</ListItemButton>
							</ListItem>
							<Divider />
						</>
					)
				})}
			</List>
		</Card>
	)
}

export { TodoList }
