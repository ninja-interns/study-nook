// Import Dependencies
import * as React from "react"

//Import Material UI Dependencies
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { List, ListItem, ListItemIcon, Checkbox, TextField, Divider, IconButton } from "@material-ui/core"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import DeleteIcon from "@material-ui/icons/Delete"

// Import Interfaces
import { TodoListInterface } from "./interfaces"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			maxWidth: 360,
		},
	}),
)

export default function TodoList(props: TodoListInterface) {
	const classes = useStyles()

	return (
		<List className={classes.root}>
			{props.todos.map((todo) => {
				return (
					<div>
						<ListItem key={todo.id}>
							{/* This element handles the check/unchecking a todo item */}
							<ListItemIcon>
								<Checkbox edge="start" tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": todo.title }} />
							</ListItemIcon>

							{/* This element renders the title/text of the todo */}
							<TextField value={todo.title} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, todo.id)} />

							{/* This element handles deleting a todo item */}
							<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="delete" onClick={(event) => props.handleTodoRemove(todo.id)}>
									<DeleteIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
						<Divider />
					</div>
				)
			})}
		</List>
	)
}
