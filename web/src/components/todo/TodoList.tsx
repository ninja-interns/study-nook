// Import Dependencies
import * as React from "react"

//Import Material UI Dependencies
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import TextField from "@material-ui/core/TextField"
import Divider from "@material-ui/core/Divider"

// Import Interfaces
import { TodoListInterface } from "./interfaces"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			maxWidth: 360,
			backgroundColor: "#eceff1",
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
								<Checkbox edge="start" tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": todo.text }} />
							</ListItemIcon>

							{/* This element renders the title/text of the todo */}
							<TextField value={todo.text} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, todo.id)} />

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
