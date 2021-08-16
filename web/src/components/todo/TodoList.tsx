// Import Dependencies
import * as React from "react"

// Import TodoItem
import TodoItem from "./TodoItem"

// Import Interfaces
import { TodoListInterface } from "../../interfaces"

/* TodoList component
	This component accepts handler methods for the TodoItem and an array of todo objects.
	Inside this div will be a list, one ul element. 
	Inside this element, you will use map() to iterate over the array of todo objects, 
	and create one li element with one TodoItem component for every todo object. 
	You will then pass the individually todo objects to the TodoItem component, along with handler methods.
*/
const TodoList = (props: TodoListInterface) => {
	return (
		<div className="todo-list">
			<ul>
				{props.todos.map((todo) => (
					<li key={todo.id}>
						<TodoItem
							todo={todo}
							handleTodoUpdate={props.handleTodoUpdate}
							handleTodoRemove={props.handleTodoRemove}
							handleTodoComplete={props.handleTodoComplete}
							handleTodoBlur={props.handleTodoBlur}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TodoList
