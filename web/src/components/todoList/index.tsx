import * as React from "react"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { useStyles } from "./todoCss"
import { TodoContent } from "./interfaces"

const TodoListApp = () => {
    const css = useStyles()
    const [todos, setTodos] = React.useState<TodoContent[]>([])

    // Getting todos from Database
    React.useEffect(() => {
        async function getTodoList() {
            const response = await fetch("/api/getTodos")
            const result: TodoContent[] = await response.json()
            console.log(result)
            setTodos(result)
        }

        getTodoList()
    }, [])

    // Handler Functions
    function handleTodoCreate(todo: TodoContent) {
        const newTodosState: TodoContent[] = [...todos]
        newTodosState.push(todo)
        setTodos(newTodosState)
    }

    function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
        const newTodosState: TodoContent[] = [...todos]
        newTodosState.find((todo: TodoContent) => todo.id === id)!.todo_text = event.target.value
        setTodos(newTodosState)
    }

    function handleTodoRemove(id: string) {
        const newTodosState: TodoContent[] = todos.filter((todo: TodoContent) => todo.id !== id)
        setTodos(newTodosState)
    }

    function handleTodoComplete(id: string) {
        const newTodosState: TodoContent[] = [...todos]
        newTodosState.find((todo: TodoContent) => todo.id === id)!.is_completed = !newTodosState.find((todo: TodoContent) => todo.id === id)!.is_completed
        setTodos(newTodosState)
    }

    return (
        <div className={css.container}>
            <TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />
            <TodoList todos={todos} handleTodoUpdate={handleTodoUpdate} handleTodoComplete={handleTodoComplete} handleTodoRemove={handleTodoRemove} />
        </div>
    )
}

export default TodoListApp
