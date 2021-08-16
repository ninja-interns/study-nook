// This component represents adding a new item to the todo list

// Import Dependencies
import * as React from "react"

// Import Interfaces
import { TodoItemInterface } from "../../interfaces"

/* TodoItem Component
	First div element handles the check/unchecking a todo item
	Second div element renders the title/text of the todo
	Third div element removes the todo item 
*/
const TodoItem = (props: TodoItemInterface) => {
	return (
		<div className="todo-item">
			<div onClick={() => props.handleTodoComplete(props.todo.id)}>
				{props.todo.isCompleted ? <span className="todo-item-checked">✔</span> : <span className="todo-item-unchecked" />}
			</div>

			<div className="todo-item-input-wrapper">
				<input
					value={props.todo.text}
					onBlur={props.handleTodoBlur}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.id)}
				/>
			</div>

			<div className="item-remove" onClick={() => props.handleTodoRemove(props.todo.id)}>
				⨯
			</div>
		</div>
	)
}

export default TodoItem
