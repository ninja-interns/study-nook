export interface TodoContent {
    id: string
    ownerId: string | null
    text: string
    isCompleted: boolean
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
