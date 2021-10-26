export interface TodoContent {
	id: string
	isCompleted: boolean
	todoText: string
	userId: string
	todoTitle: string
}

export interface TodoFormInterface {
	todos: TodoContent[]
	handleTodoCreate: (todo: TodoContent) => void
}

export interface TodoListInterface {
	todos: TodoContent[]
	handleTodoUpdate: (todoItem: TodoContent) => void
	handleTodoRemove: (todoItem: TodoContent) => void
}

export interface TodoListUpdateInterface {
	todo: TodoContent
	todos: TodoContent[]
	handleTodoUpdate: (todoItem: TodoContent) => void
	handleTodoRemove: (todoItem: TodoContent) => void
}
