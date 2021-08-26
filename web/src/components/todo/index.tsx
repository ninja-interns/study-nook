// Import dependencies
import * as React from "react"
import { render } from "react-dom"

// Import components
import TodoForm from "./Form"
import TodoList from "./TodoList"

// Import interfaces
import { TodoInterface } from "./interfaces"

// TodoListApp Component
export const TodoListApp = () => {
	// The state is an array of objects. One object will represent an existing todo
	const [todos, setTodos] = React.useState<TodoInterface[]>([])

	// Creating new todo item
	function handleTodoCreate(todo: TodoInterface) {
		// Prepare new todos state
		const newTodosState: TodoInterface[] = [...todos]

		// Update new todos state
		newTodosState.push(todo)

		// Update todos state
		setTodos(newTodosState)
	}

	// Update existing todo item
	function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
		// Prepare new todos state
		const newTodosState: TodoInterface[] = [...todos]

		// Find correct todo item to update
		newTodosState.find((todo: TodoInterface) => todo.id === id)!.title = event.target.value

		// Update todos state
		setTodos(newTodosState)
	}

	// Remove existing todo item
	function handleTodoRemove(id: string) {
		// Prepare new todos state
		const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)

		// Update todos state
		setTodos(newTodosState)
	}

	// Check existing todo item as completed
	function handleTodoComplete(id: string) {
		// Copy current todos state
		const newTodosState: TodoInterface[] = [...todos]

		// Find the correct todo item and update its 'isCompleted' key
		newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted = !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted

		// Update todos state
		setTodos(newTodosState)
	}

	return (
		<div className="todo-list-app">
			<h1>Todo List</h1>

			{/* Todo form component */}
			<TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />

			{/* Todo list component */}
			<TodoList todos={todos} handleTodoUpdate={handleTodoUpdate} handleTodoRemove={handleTodoRemove} handleTodoComplete={handleTodoComplete} />
		</div>
	)
}

const rootElement = document.getElementById("root")
render(<TodoListApp />, rootElement)

/* Check if todo item has title
	function handleTodoBlur(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length === 0) {
			event.target.classList.add("todo-input-error")
		} else {
			event.target.classList.remove("todo-input-error")
		}
	} */
