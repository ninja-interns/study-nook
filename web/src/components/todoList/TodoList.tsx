// TODO: Sort the todos - completed at the bottom of the list
//! Explanation of component

import * as React from "react"
import { TodoContent } from "./interfaces"
import { ListItemButton, List, ListItem, ListItemIcon, Checkbox, Typography, Card } from "@mui/material"

const TodoList = () => {
	const [todos, setTodos] = React.useState<TodoContent[]>([])

	//! Explanation of function
	React.useEffect(() => {
		async function getTodoList() {
			const response = await fetch("/api/getTodos")
			if (response.ok) {
				const data: TodoContent[] = await response.json()
				setTodos(data)
			} else {
				console.error("Error fetching todo list: " + response.statusText)
			}
		}
		getTodoList()
	}, [])

	//! Explanation of function
	async function handleTodoComplete(todoItem: TodoContent) {
		// Updating todos state
		const newTodosState: TodoContent[] = [...todos]
		newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!.is_completed = !newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!
			.is_completed
		setTodos(newTodosState)

		// Updating completion status in the database
		await fetch("/api/updateTodo", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todoItem),
		})
	}

	return (
		<Card>
			<List
				sx={{
					height: "10rem",
					overflow: "auto",
				}}
			>
				{todos.map((todo) => {
					return (
						<ListItem key={todo.id}>
							<ListItemButton role={undefined} onClick={() => handleTodoComplete(todo)} dense>
								<ListItemIcon>
									<Checkbox checked={todo.is_completed} edge="start" />
								</ListItemIcon>
								<Typography>{todo.todo_text}</Typography>
							</ListItemButton>
						</ListItem>
					)
				})}
			</List>
		</Card>
	)
}

export default TodoList
