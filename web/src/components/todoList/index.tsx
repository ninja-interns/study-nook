// import * as React from "react"
// import TodoForm from "./TodoForm"
// import TodoListForm from "./TodoListForm"
// import { TodoContent } from "./interfaces"

// const TodoListApp = () => {
// 	const [todos, setTodos] = React.useState<TodoContent[]>([])

// 	React.useEffect(() => {
// 		async function getTodoList() {
// 			const response = await fetch("/api/getTodos")
// 			const data: TodoContent[] = await response.json()
// 			setTodos(data)
// 			// Add error handling here
// 		}
// 		getTodoList()
// 	}, []) // not sure that I need this dependency?

// 	// Handler Functions
// 	async function handleTodoCreate(todo: TodoContent) {
// 		// Update the todos state - Was getting error because the inital todos state was null
// 		if (todos == null) {
// 			const newTodosState: TodoContent[] = []
// 			newTodosState.push(todo)
// 			setTodos(newTodosState)
// 		} else {
// 			const newTodosState: TodoContent[] = [...todos]
// 			newTodosState.push(todo)
// 			setTodos(newTodosState)
// 		}

// 		// Add todo to the database - need to add error handling
// 		await fetch("/api/createTodo", {
// 			method: "POST",
// 			headers: { "content-type": "application/json" },
// 			body: JSON.stringify(todo),
// 		})
// 	}
// 	async function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, todoItem: TodoContent) {
// 		// Updating the todos state
// 		const newTodosState: TodoContent[] = [...todos]
// 		newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!.todo_text = event.target.value
// 		setTodos(newTodosState)

// 		// Updating the todo in the database
// 		await fetch("/api/updateTodo", {
// 			method: "POST",
// 			headers: { "content-type": "application/json" },
// 			body: JSON.stringify(todoItem),
// 		})
// 	}

// 	async function handleTodoRemove(todoItem: TodoContent) {
// 		// Updating the todos state
// 		const newTodosState: TodoContent[] = todos.filter((todo: TodoContent) => todo.id !== todoItem.id)
// 		setTodos(newTodosState)

// 		// Deleting todo from the database
// 		await fetch("/api/deleteTodo", {
// 			method: "POST",
// 			headers: { "content-type": "application/json" },
// 			body: JSON.stringify(todoItem),
// 		})
// 	}

// 	return (
// 		<div>
// 			<TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />
// 			<TodoListForm todos={todos} handleTodoUpdate={handleTodoUpdate} handleTodoRemove={handleTodoRemove} />
// 		</div>
// 	)
// }

// export default TodoListApp

//! Explanation of component

import * as React from "react"
import TodoForm from "./TodoForm"
import TodoListForm from "./TodoListForm"
import { TodoContent } from "./interfaces"

const TodoListApp = () => {
	const [todos, setTodos] = React.useState<TodoContent[]>([])

	React.useEffect(() => {
		async function getTodoList() {
			const response = await fetch("/api/getTodos")
			const data: TodoContent[] = await response.json()
			setTodos(data)
			// Add error handling here
		}
		getTodoList()
	}, []) // not sure that I need this dependency?

	// type JSONResponse = {
	// 	data?: {
	// 		todoList: TodoContent[]
	// 	}
	// 	errors?: Array<{ message: string }>
	// }

	// //! Explanation of function
	// React.useEffect(() => {
	// 	async function getTodoList() {
	// 		console.log("getting todolist")
	// 		const response = await fetch("/api/getTodos", {
	// 			method: "GET",
	// 			headers: { "content-type": "application/json" },
	// 		})
	// 		const { data, errors }: JSONResponse = await response.json()
	// 		console.log(data)
	// 		if (response.ok) {
	// 			if (data?.todoList) setTodos(data.todoList)
	// 		} else {
	// 			const error = new Error(errors?.map((e) => e.message).join("\n") ?? "unknown")
	// 			return Promise.reject(error)
	// 		}
	// 	}
	// 	getTodoList()
	// }, [])

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
		await fetch("/api/createTodo", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todo),
		})
	}

	//! Explanation of function
	async function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, todoItem: TodoContent) {
		// Updating the todos state
		const newTodosState: TodoContent[] = [...todos]
		newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!.todo_text = event.target.value
		setTodos(newTodosState)

		// Updating the todo in the database
		await fetch("/api/updateTodo", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todoItem),
		})
	}

	//! Explanation of function
	async function handleTodoRemove(todoItem: TodoContent) {
		// Updating the todos state
		const newTodosState: TodoContent[] = todos.filter((todo: TodoContent) => todo.id !== todoItem.id)
		setTodos(newTodosState)

		// Deleting todo from the database
		await fetch("/api/deleteTodo", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(todoItem),
		})
	}

	return (
		<div>
			<TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />
			<TodoListForm todos={todos} handleTodoUpdate={handleTodoUpdate} handleTodoRemove={handleTodoRemove} />
		</div>
	)
}

export default TodoListApp
