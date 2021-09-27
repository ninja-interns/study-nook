export interface TodoContent {
	id: string
	user_id: string
	todo_text: string
	is_completed: boolean
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
