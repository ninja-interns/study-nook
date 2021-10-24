import { Box, Checkbox, Divider, List, ListItem, ListItemButton, ListItemIcon, Paper, Typography } from "@mui/material"
import * as React from "react"
import { DomainContainer } from "../../../contexts/DomainContext"
import { TodoContent } from "../interfaces"

/**
 * * TODO LIST COMPONENT
 * * Renders the todo list stored in the database
 * * Updates the todo item to completed or not completed when the user clicks the checkbox
 */
const TodoList = () => {
	const { url } = DomainContainer.useContainer()
	const [todos, setTodos] = React.useState<TodoContent[]>([])

	//* Requests the API to return todos stored in the database - Runs once on render
	React.useEffect(() => {
		async function getTodoList() {
			const response = await fetch(`${url}/api/get_todos`)
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
		await fetch(`${url}/api/update_todo`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todoItem),
		})
	}

	return (
		<Box>
			<Typography sx={{ pt: 2 }}>List:</Typography>
			<List
				sx={{
					height: 260,
					overflow: "auto",
					width: 400,

					// Scrollbar styling
					"&::-webkit-scrollbar": {
						display: "none",
					},
				}}
			>
				{todos.map((todo) => {
					return (
						<>
							<Divider />
							<ListItem key={todo.id} sx={{ width: "400", p: 0, m: 0 }}>
								<Divider orientation="vertical" color="primary" sx={{ p: 0, m: 0, borderWidth: 2, height: 60 }} />

								<ListItemButton role={undefined} onClick={() => handleTodoComplete(todo)} dense>
									<ListItemIcon>
										<Checkbox checked={todo.isCompleted} edge="start" />
									</ListItemIcon>
									<Box sx={{ display: "flex", flexDirection: "column" }}>
										<Typography color="secondary" component="div" sx={{ pl: 2, fontStyle: "bold" }}>
											{todo.todoTitle}
										</Typography>
										<Typography component="div" sx={{ pl: 2 }}>
											{todo.todoText}
										</Typography>
									</Box>
								</ListItemButton>
							</ListItem>
						</>
					)
				})}
			</List>
		</Box>
	)
}

export { TodoList }
