import * as React from "react"
import { Timer } from "../../components/countdownTimer/timer/index"
import { TodoList } from "../../components/todoList/list"
import { useHistory } from "react-router-dom"
import { Toolbar, Typography, createTheme, ThemeProvider, useTheme, IconButton, AppBar, Menu, MenuItem, Stack, Paper, Button } from "@mui/material"
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Menu as MenuIcon } from "@mui/icons-material"
import NavigationBar from "../../components/bottomNavigationBar"
import { GameInterface } from "../../components/gameInterface"

/**
 * * NOOKING PAGE
 * * This is the page of the app where the user is studying / working
 * * It diaplays the timer and todo items that they created on the nooking setup page
 **/
const Nooking = () => {
	const history = useHistory() // user route history

	//* Delete the timer and route the user to the dashboard
	async function handleStopNooking() {
		const response = await fetch("http://localhost:8080/api/delete_timer")
		if (!response.ok) {
			console.error("Error deleting timer: " + response.statusText)
		}
		history.push("/dashboard")
	}

	return (
		<>
			<Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
				<Stack direction="row" justifyContent="center" alignItems="center" spacing={10}>
					<Timer />
					<Button variant="contained" onClick={handleStopNooking}>
						Stop Nooking
					</Button>
				</Stack>
				<Paper elevation={2}>
					<GameInterface />
				</Paper>
				<TodoList />
			</Stack>
		</>
	)
}

export { Nooking }
