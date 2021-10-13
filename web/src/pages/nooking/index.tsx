import * as React from "react"
import { Timer } from "../../components/countdownTimer/timer/index"
import { TodoList } from "../../components/todoList/list"
import { useHistory } from "react-router-dom"
import { Box, Toolbar, Typography, createTheme, ThemeProvider, useTheme, IconButton, AppBar, Menu, MenuItem } from "@mui/material"
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Menu as MenuIcon } from "@mui/icons-material"
import NavigationBar from "../../components/bottomNavigationBar"

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
			<Timer />
			<TodoList />
			<NavigationBar />
		</>
	)
}

export { Nooking }
