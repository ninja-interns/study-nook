import * as React from "react"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import { useStyles } from "./todoCss"
import { TodoContent } from "./interfaces"
import { Typography } from "@material-ui/core"

const TodoListApp = () => {
    const css = useStyles()
    const [todos, setTodos] = React.useState<TodoContent[]>([])

    function handleTodoCreate(todo: TodoContent) {
        const newTodosState: TodoContent[] = [...todos]
        newTodosState.push(todo)
        setTodos(newTodosState)
    }

    function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
        const newTodosState: TodoContent[] = [...todos]
        newTodosState.find((todo: TodoContent) => todo.id === id)!.text = event.target.value
        setTodos(newTodosState)
    }

    function handleTodoRemove(id: string) {
        const newTodosState: TodoContent[] = todos.filter((todo: TodoContent) => todo.id !== id)
        setTodos(newTodosState)
    }

    function handleTodoComplete(id: string) {
        const newTodosState: TodoContent[] = [...todos]
        newTodosState.find((todo: TodoContent) => todo.id === id)!.isCompleted = !newTodosState.find((todo: TodoContent) => todo.id === id)!.isCompleted
        setTodos(newTodosState)
    }

    return (
        <div className={css.container}>
            {/* <Typography variant="h2">Todo List</Typography> */}
            <TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />
            <TodoList todos={todos} handleTodoUpdate={handleTodoUpdate} handleTodoComplete={handleTodoComplete} handleTodoRemove={handleTodoRemove} />
        </div>
    )
}

export default TodoListApp
