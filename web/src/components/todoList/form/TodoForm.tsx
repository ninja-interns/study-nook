import * as React from "react"
import { v4 as uuidv4 } from "uuid"
import { TodoContent, TodoFormInterface } from "../interfaces"
import { TextField } from "@mui/material"
import { Box } from "@mui/system"

/**
 * * TODO FORM COMPONENT
 * * This component creates a new todo from the users input and adds it to the todo list
 */
const TodoForm = (props: TodoFormInterface) => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [inputText, setInputText] = React.useState("")

	//* Updates the input text with what the user is typing into the TextField - Runs when the input changes
	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		setInputText(event.target.value)
	}

	//* Creates a new todo item and resets the input field to blank - Runs when the user hits enter to add a new todo
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault() // Prevent the page from reloading

		// Create new todo item
		const newTodo: TodoContent = {
			id: uuidv4(),
			userId: "",
			todoText: inputText,
			isCompleted: false,
		}
		props.handleTodoCreate(newTodo)

		// Reset the input field
		if (inputRef && inputRef.current) {
			inputRef.current.value = ""
		}
	}

	return (
		<Box component="form" onSubmit={handleSubmit}>
			<TextField
				variant="filled"
				label="Add a todo"
				inputRef={inputRef}
				onChange={handleInputChange}
				color="secondary"
				sx={{
					width: "100%",
				}}
			/>
		</Box>
	)
}

export { TodoForm }
