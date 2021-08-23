// Todo Interface
export interface TodoInterface {
	id: string
	text: string
	isUrgent: boolean
	isCompleted: boolean
}

// Todo Form Interface
export interface TodoFormInterface {
	todos: TodoInterface[]
	handleTodoCreate: (todo: TodoInterface) => void
}

// Todo List Interface
export interface TodoListInterface {
	handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
	handleTodoRemove: (id: string) => void
	handleTodoComplete: (id: string) => void
	todos: TodoInterface[]
}
