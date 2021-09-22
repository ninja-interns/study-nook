// ! If you refresh the page the todos will all be set to not completed

import * as React from 'react'
import {TodoContent} from './interfaces'
import {
  ListItemButton,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  Typography,
} from '@mui/material'

const TodoList = () => {
  const [todos, setTodos] = React.useState<TodoContent[]>([])
  
  // Get Todos from database
  React.useEffect(() => {
    async function getTodoList() {
      const response = await fetch('/api/getTodos')
      const data: TodoContent[] = await response.json()
      setTodos(data)
      // Add error handling here
    }
    getTodoList()
  })
  if (todos === null) return null

  async function handleTodoComplete(todoItem: TodoContent) {
    // Updating todos state
    const newTodosState: TodoContent[] = [...todos]
    newTodosState.find(
      (todo: TodoContent) => todo.id === todoItem.id,
    )!.is_completed = !newTodosState.find(
      (todo: TodoContent) => todo.id === todoItem.id,
    )!.is_completed
    setTodos(newTodosState)

    // Updating completion status in the database
    await fetch('/api/updateTodo', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(todoItem),
    })
  }

  return (
    <List
      sx={{
        height: '15rem',
        overflow: 'auto',
        width: '100%',
        backgroundColor: 'grey',
      }}
    >
      {todos.map(todo => {
        return (
          <ListItem key={todo.id}>
            <ListItemButton
              role={undefined}
              onClick={() => handleTodoComplete(todo)}
              dense
            >
              <ListItemIcon>
                <Checkbox edge="start" />
              </ListItemIcon>
              <Typography>{todo.todo_text}</Typography>
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

export default TodoList
