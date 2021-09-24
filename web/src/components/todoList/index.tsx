//! Explanation of component

import * as React from "react"
import TodoForm from "./TodoForm"
import TodoListForm from "./TodoListForm"
import { TodoContent } from "./interfaces"

const TodoListApp = () => {
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
	async function handleTodoCreate(todo: TodoContent) {
		// Update the todos state
		if (todos == null) {
			const newTodosState: TodoContent[] = []
			newTodosState.push(todo)
			setTodos(newTodosState)
		} else {
			const newTodosState: TodoContent[] = [...todos]
			newTodosState.push(todo)
			setTodos(newTodosState)
		}

		// Add todo to the database
		const response = await fetch("/api/createTodo", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todo),
		})
		if (!response.ok) {
			console.error("Error creating todo item: " + response.statusText)
		}
	}

	//! Explanation of function
	async function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, todoItem: TodoContent) {
		// Updating the todos state
		const newTodosState: TodoContent[] = [...todos]
		newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!.todo_text = event.target.value
		setTodos(newTodosState)

		// Updating the todo in the database
		const response = await fetch("/api/updateTodo", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todoItem),
		})
		if (!response.ok) {
			console.error("Error creating todo item: " + response.statusText)
		}
	}

	//! Explanation of function
	async function handleTodoRemove(todoItem: TodoContent) {
		// Updating the todos state
		const newTodosState: TodoContent[] = todos.filter((todo: TodoContent) => todo.id !== todoItem.id)
		setTodos(newTodosState)

		// Deleting todo from the database
		const response = await fetch("/api/deleteTodo", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todoItem),
		})
		if (!response.ok) {
			console.error("Error deleting todo item: " + response.statusText)
		}
	}

	return (
		<div>
			<TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />
			<TodoListForm todos={todos} handleTodoUpdate={handleTodoUpdate} handleTodoRemove={handleTodoRemove} />
		</div>
	)
}

export default TodoListApp
