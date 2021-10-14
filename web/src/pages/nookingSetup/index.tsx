import { Box, Button } from "@mui/material"
import React from "react"
import { useHistory } from "react-router-dom"
import NavigationBar from "../../components/bottomNavigationBar"
import { TimerForm } from "../../components/countdownTimer/form"
import { TodoListApp } from "../../components/todoList/form"

/**
 * * NOOKING SETUP PAGE
 * * This is the page of the app where the user sets up their todo list and timer duration
 * * The timer will not be created until the user clicks the "Start Nooking" button
 **/
const NookingSetup = () => {
	const history = useHistory() // routes history

	return (
		<Box
			sx={{
				p: 2,
				display: "grid",
				gridTemplateColumns: "repeat(4, 1fr)",
				gap: 2,
				gridTemplateRows: "auto",
				gridTemplateAreas: `
					"form form . ."
					"form form button button"
					"form form . ."
  					"list list list list" `,
			}}
		>
			<Box sx={{ gridArea: "form" }}>
				<TimerForm />
			</Box>
			<Box sx={{ gridArea: "list" }}>
				<TodoListApp />
			</Box>
			<Box sx={{ gridArea: "button" }}>
				<Button fullWidth variant="contained" onClick={() => history.push("/nooking")}>
					Start Nooking
				</Button>
			</Box>
			<NavigationBar />
		</Box>
	)
}

export { NookingSetup }
