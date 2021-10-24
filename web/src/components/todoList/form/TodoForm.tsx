import * as React from "react"
import { v4 as uuidv4 } from "uuid"
import { TodoContent, TodoFormInterface } from "../interfaces"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField, Box } from "@mui/material"

/**
 * * TODO FORM COMPONENT
 * * This component creates a new todo from the users input and adds it to the todo list
 */
const TodoForm = (props: TodoFormInterface) => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [inputText, setInputText] = React.useState("")
	const [inputTitle, setInputTitle] = React.useState("")

	//* Updates the input text with what the user is typing into the TextField - Runs when the input changes
	function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
		console.log(event.target.value)
		setInputTitle(event.target.value)
	}
	function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
		console.log(event.target.value)
		setInputText(event.target.value)
	}

	//* Creates a new todo item and resets the input field to blank - Runs when the user hits enter to add a new todo
	function handleSubmit() {
		console.log("handle submit")

		// Create new todo item
		const newTodo: TodoContent = {
			id: uuidv4(),
			userId: "",
			todoText: inputText,
			isCompleted: false,
			todoTitle: inputTitle,
		}
		props.handleTodoCreate(newTodo)
		console.log(newTodo)

		//Close the form
		setOpen(false)
	}

	//* MUI Component
	const [open, setOpen] = React.useState(false)
	const handleClickOpen = () => {
		setOpen(true)
	}

	return (
		<Box>
			<Button
				variant="outlined"
				onClick={handleClickOpen}
				size="large"
				sx={{
					fontSize: 26,
					"& .MuiButton": {
						borderRadius: "1px",
					},
				}}
			>
				Create New Task
			</Button>
			<Dialog disableEscapeKeyDown open={open}>
				<DialogTitle>Create New Task</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField
								variant="filled"
								label="Title"
								inputRef={inputRef}
								onChange={handleTitleChange}
								color="secondary"
								sx={{
									width: "100%",
								}}
							/>
							<TextField
								variant="filled"
								label="Description"
								inputRef={inputRef}
								onChange={handleTextChange}
								color="secondary"
								sx={{
									width: "100%",
								}}
							/>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button type="submit" onClick={handleSubmit}>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export { TodoForm }
