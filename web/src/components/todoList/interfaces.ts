export interface TodoContent {
    id: string
    user_id: string | null
    todo_text: string
    is_completed: boolean
}

export interface TodoFormInterface {
    todos: TodoContent[] | null
    handleTodoCreate: (todo: TodoContent) => void
}

export interface TodoListInterface {
    todos: TodoContent[] | null
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
    handleTodoRemove: (id: string) => void
    handleTodoComplete: (id: string) => void
}

export interface TodoItemInterface {
    todo: TodoContent
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void
    handleTodoRemove: (id: string) => void
    handleTodoComplete: (id: string) => void
}
