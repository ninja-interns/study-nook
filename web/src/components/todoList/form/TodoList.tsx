import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControl,
	IconButton,
	List,
	ListItem,
	TextField,
	Typography,
} from "@mui/material"
import React from "react"
import { TodoContent, TodoListInterface, TodoListUpdateInterface } from "../interfaces"

/**
 * * TODO LIST (FORM) COMPONENT
 * * Displays the users current todo list - The user can update and delete these todos
 */
const TodoListForm = (props: TodoListInterface) => {
	if (props.todos === undefined || null) return null // Return nothing if there are no todos in the list

	return (
		<Box>
			<List
				sx={{
					height: 340,
					overflowY: "auto",
					width: 400,

					// Scrollbar styling
					"&::-webkit-scrollbar": {
						display: "none",
					},
				}}
			>
				{/* Itterate through the todos array and load each todo item */}
				{props.todos.map((todo) => {
					return (
						<>
							<Divider />
							<ListItem
								key={todo.id}
								sx={{ height: 60, width: 400, p: 0, m: 0 }}
								secondaryAction={
									<Box sx={{ display: "flex" }}>
										<Box sx={{ pr: 2 }}>
											<EditButton
												todo={todo}
												todos={props.todos}
												handleTodoRemove={props.handleTodoRemove}
												handleTodoUpdate={props.handleTodoUpdate}
											/>
										</Box>
										<IconButton edge="end" aria-label="delete" onClick={() => props.handleTodoRemove(todo)}>
											<DeleteIcon />
										</IconButton>
									</Box>
								}
							>
								<Box sx={{ display: "flex", flexDirection: "column" }}>
									<Typography color="secondary" component="div" sx={{ pl: 2, fontStyle: "bold" }}>
										{todo.todoTitle}
									</Typography>
									<Typography component="div" sx={{ pl: 2 }}>
										{todo.todoText}
									</Typography>
								</Box>
							</ListItem>
						</>
					)
				})}
			</List>
		</Box>
	)
}

/**
 * * EDIT BUTTON COMPONENT
 * * When the edit button is pressed a dialog appears where the user can change the description and title of the todo
 */
const EditButton = (props: TodoListUpdateInterface) => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [inputText, setInputText] = React.useState(props.todo.todoText)
	const [inputTitle, setInputTitle] = React.useState(props.todo.todoTitle)

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
	function handleSubmit(todo: TodoContent) {
		// Create new todo item
		const newTodo: TodoContent = {
			id: todo.id,
			userId: todo.userId,
			todoText: inputText,
			isCompleted: false,
			todoTitle: inputTitle,
		}
		props.handleTodoUpdate(newTodo)

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
			<IconButton edge="end" onClick={handleClickOpen}>
				<EditIcon />
			</IconButton>
			<Dialog disableEscapeKeyDown open={open}>
				<DialogTitle>Edit Task</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField
								variant="filled"
								label="Title"
								defaultValue={props.todo.todoTitle}
								inputRef={inputRef}
								onChange={handleTitleChange}
								sx={{
									width: "100%",
								}}
							/>
							<TextField
								variant="filled"
								label="Description"
								defaultValue={props.todo.todoText}
								inputRef={inputRef}
								onChange={handleTextChange}
								sx={{
									width: "100%",
								}}
							/>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						type="submit"
						onClick={() => {
							handleSubmit(props.todo)
						}}
					>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}
export { TodoListForm }
