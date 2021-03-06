import { Box } from "@mui/material"
import * as React from "react"
import { DomainContainer } from "../../../contexts/DomainContext"
import { TodoContent } from "../interfaces"
import { TodoForm } from "./TodoForm"
import { TodoListForm } from "./TodoList"

/**
 * * TODO LIST APP COMPONENT
 * * This component creates, updates and deletes todo items
 * * It updates the state of the todo form and todolist form components
 **/
const TodoListApp = () => {
	const { url } = DomainContainer.useContainer()
	const [todos, setTodos] = React.useState<TodoContent[]>([])

	//* Requests the API to return all todos in the database - Runs once on render
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

	/**
	 * * Imports a todo from the TodoForm component
	 * * Adds the new todo to the todo list then adds it to the database
	 */
	async function handleTodoCreate(todo: TodoContent) {
		// Add the new todo to the database
		const response = await fetch(`${url}/api/create_todo`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todo),
		})
		if (!response.ok) {
			console.error("Error creating todo item: " + response.statusText)
		}

		// Update the TodoListForm to display the added todo
		if (todos === null) {
			// Create a new empty list then add the new todo to it
			const newTodosState: TodoContent[] = []
			newTodosState.push(todo)
			setTodos(newTodosState)
		} else {
			// Create a new list with all the current todos then add the new todo to it
			const newTodosState: TodoContent[] = [...todos]
			newTodosState.push(todo)
			setTodos(newTodosState)
		}
	}

	//* Imports a TodoItem and updates the old TodoItem with the new information
	async function handleTodoUpdate(todoItem: TodoContent) {
		// Update the todoList with the new todoItems information - Updates TodoListForm
		const newTodosState: TodoContent[] = [...todos]
		newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!.todoText = todoItem.todoText
		setTodos(newTodosState)
		// Set new title
		newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!.todoTitle = todoItem.todoTitle
		setTodos(newTodosState)

		// Update the todo in the database
		const response = await fetch(`${url}/api/update_todo`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todoItem),
		})
		if (!response.ok) {
			console.error("Error creating todo item: " + response.statusText)
		}
	}

	//* Deletes a todo from the list
	async function handleTodoRemove(todoItem: TodoContent) {
		// Delete todo from the database
		const response = await fetch(`${url}/api/delete_todo`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todoItem),
		})
		if (!response.ok) {
			console.error("Error deleting todo item: " + response.statusText)
		}

		// Create a new todo list without the deleted todo - Updates TodoListForm
		const newTodosState: TodoContent[] = todos.filter((todo: TodoContent) => todo.id !== todoItem.id)
		setTodos(newTodosState)
	}

	return (
		<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<TodoListForm todos={todos} handleTodoUpdate={handleTodoUpdate} handleTodoRemove={handleTodoRemove} />
			<TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />
		</Box>
	)
}

export { TodoListApp }
