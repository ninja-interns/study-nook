// Import dependencies
import * as React from "react"
import shortid from "shortid"

// Import Material UI
import { TextField } from "@material-ui/core"

// Import interfaces
import { TodoInterface, TodoFormInterface } from "./interfaces"

// Todo form component
const TodoForm = (props: TodoFormInterface) => {
	// Create ref for form input
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
		// Stop the page from reloading
		event.preventDefault()

		// Check for 'Enter' key
		if (event.key === "Enter") {
			// Prepare new todo object
			const newTodo: TodoInterface = {
				id: shortid.generate(),
				text: formState,
				isCompleted: false,
			}

			// Create new todo item
			props.handleTodoCreate(newTodo)

			// Reset the input field
			if (inputRef && inputRef.current) {
				inputRef.current.value = ""
			}
		}
	}

	return (
		<form className="todo-form">
			<TextField
				// Material UI Styling
				id="outlined-basic"
				variant="outlined"
				// --
				label="Enter new todo"
				inputRef={inputRef}
				type="text"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
				onKeyPress={(event: React.KeyboardEvent) => handleInputEnter(event)}
			/>
		</form>
	)
}

export default TodoForm
