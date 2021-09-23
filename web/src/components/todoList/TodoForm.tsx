//! Explanation of component

import * as React from "react"
import { v4 as uuidv4 } from "uuid"
import { TodoContent, TodoFormInterface } from "./interfaces"
import { TextField } from "@mui/material"
import { Box } from "@mui/system"

const TodoForm = (props: TodoFormInterface) => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [inputText, setInputText] = React.useState("")

	//! Explanation of function
	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setInputText(event.target.value)
	}

	//! Explanation of function
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		// Prevent the page from reloading
		event.preventDefault()

		// Create new todo item
		const newTodo: TodoContent = {
			id: uuidv4(),
			user_id: "",
			todo_text: inputText,
			is_completed: false,
		}
		props.handleTodoCreate(newTodo)

		// Reset the input field
		if (inputRef && inputRef.current) {
			inputRef.current.value = ""
		}
	}

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				width: 200,
				maxWidth: "50%",
			}}
		>
			<TextField variant="outlined" label="Add a todo" inputRef={inputRef} onChange={handleInputChange} color="secondary" />
		</Box>
	)
}

export default TodoForm
