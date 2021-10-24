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
import { TodoListInterface, TodoListUpdateInterface } from "../interfaces"

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
								sx={{ height: 50, width: 400, p: 0, m: 0 }}
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
								<Divider orientation="vertical" color="primary" sx={{ p: 0, m: 0, borderWidth: 2, height: 60 }} />
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
 * !! COMMENT
 */
const EditButton = (props: TodoListUpdateInterface) => {
	const [open, setOpen] = React.useState(false)
	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
		if (reason !== "backdropClick") {
			setOpen(false)
		}
	}

	return (
		<Box>
			<IconButton edge="end" onClick={handleClickOpen}>
				<EditIcon />
			</IconButton>
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Create New Task</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField
								variant="standard"
								defaultValue={props.todo.todoTitle}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo)}
								error={props.todo.todoTitle === ""}
								sx={{ width: "100%" }}
							/>
							<TextField
								variant="standard"
								defaultValue={props.todo.todoText}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo)}
								error={props.todo.todoText === ""}
								sx={{ width: "100%" }}
							/>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Ok</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}
export { TodoListForm }
