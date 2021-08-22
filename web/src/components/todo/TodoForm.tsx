// Import Dependencies
import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import { TextField } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

// Import interfaces
import { TodoInterface, TodoFormInterface } from "./interfaces"

/* Todo form component
    The useState hook stores the text passed into the input element, text for the todo title before you create new todo item
    The useRef hook stores the reference to this input
*/
const TodoForm = (props: TodoFormInterface) => {
	// Create reference for form input
	const inputRef = React.useRef<HTMLInputElement>(null)
	// Create form state
	const [formState, setFormState] = React.useState("")

	// Handle todo input change
	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		// Update form state with the text from input
		setFormState(event.target.value)
	}

	// Handle 'Enter' in todo input
	function handleInputEnter(event: React.KeyboardEvent) {
		// Check for 'Enter' ke
		if (event.key === "Enter") {
			// Prevent the page refreshing
			event.preventDefault()

			// Prepare new todo object
			const newTodo: TodoInterface = {
				id: uuidv4(),
				text: formState,
				isCompleted: false,
				isUrgent: false,
			}

			// Create new todo item
			props.handleTodoCreate(newTodo)

			// Reset the input field - NOT WORKING since material-ui
			if (inputRef && inputRef.current) {
				inputRef.current.value = ""
			}
		}
	}

	return (
		<form>
			<TextField
				inputRef={inputRef}
				type="text"
				placeholder="Enter new todo"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
				onKeyPress={(event: React.KeyboardEvent) => handleInputEnter(event)}
				variant="outlined"
			/>
		</form>
	)
}

export default TodoForm
