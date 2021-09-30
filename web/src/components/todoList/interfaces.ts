export interface TodoContent {
	id: string
	isCompleted: boolean
	todoText: string
	userId: string
}

export interface TodoFormInterface {
	todos: TodoContent[]
	handleTodoCreate: (todo: TodoContent) => void
}

export interface TodoListInterface {
	todos: TodoContent[]
	handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, todoItem: TodoContent) => void
	handleTodoRemove: (todoItem: TodoContent) => void
}
