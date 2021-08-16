// This component represents adding a new item to the todo list

// Import Dependencies
import * as React from "react"

// Import Interfaces
import { TodoItemInterface } from "./interfaces"

// TodoItem Component
const TodoItem = (props: TodoItemInterface) => {
	return (
		<div className="todo-item">
			{/* This element handles the check/unchecking a todo item */}
			<div onClick={() => props.handleTodoComplete(props.todo.id)}>
				{props.todo.isCompleted ? <span className="todo-item-checked">✔</span> : <span className="todo-item-unchecked" />}
			</div>

			{/* This element renders the title/text of the todo */}
			<div className="todo-item-input-wrapper">
				<input
					value={props.todo.text}
					onBlur={props.handleTodoBlur}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.id)}
				/>
			</div>

			{/* This element removes the todo item */}
			<div className="item-remove" onClick={() => props.handleTodoRemove(props.todo.id)}>
				⨯
			</div>
		</div>
	)
}

export default TodoItem
