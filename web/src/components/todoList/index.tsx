import * as React from "react"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { useStyles } from "./todoCss"
import { TodoContent } from "./interfaces"

const TodoListApp = () => {
    const css = useStyles()
    const [todos, setTodos] = React.useState<TodoContent[]>([])

    // Getting todos from Database - Should run once at the beginning
    React.useEffect(() => {
        async function getTodoList() {
            const response = await fetch("/api/getTodos")
            const data: TodoContent[] = await response.json()
            setTodos(data)
            // Add error handling here
        }
        getTodoList()
    }, [])

    // Handler Functions
    async function handleTodoCreate(todo: TodoContent) {
        // Update the todos state - Was getting error because the inital todos state was null
        if (todos == null) {
            const newTodosState: TodoContent[] = []
            newTodosState.push(todo)
            setTodos(newTodosState)
        } else {
            const newTodosState: TodoContent[] = [...todos]
            newTodosState.push(todo)
            setTodos(newTodosState)
        }

        // Add todo to the database - need to add error handling
        await fetch("/api/createTodo", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(todo),
        })
    }

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

    async function handleTodoComplete(todoItem: TodoContent) {
        // Updating todos state
        const newTodosState: TodoContent[] = [...todos]
        newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!.is_completed = !newTodosState.find((todo: TodoContent) => todo.id === todoItem.id)!
            .is_completed
        setTodos(newTodosState)

        // Updating completion status in the database
        await fetch("/api/updateTodo", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(todoItem),
        })
    }

    return (
        <div className={css.container}>
            <TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />
            <TodoList todos={todos} handleTodoUpdate={handleTodoUpdate} handleTodoComplete={handleTodoComplete} handleTodoRemove={handleTodoRemove} />
        </div>
    )
}

export default TodoListApp
