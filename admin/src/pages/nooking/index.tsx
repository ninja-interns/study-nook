import { Box, Button, createTheme, Fab, PaletteMode, Paper, Stack, ThemeProvider, useTheme } from "@mui/material"
import { useHistory } from "react-router-dom"
import { Timer } from "../../components/countdownTimer/timer/index"
import { TodoList } from "../../components/todoList/list"
import { DomainContainer } from "../../contexts/DomainContext"
import { ContextContainer } from "../../contexts/ContextContainer"
import images from "../../assets/Avatars"
import backgrounds from "../../assets/Backgrounds"
import { useGetState } from "./../../utils/getState"
import * as React from "react"
import CloseIcon from "@mui/icons-material/Close"
import StopIcon from "@mui/icons-material/Stop"

/**
 * * NOOKING PAGE
 * * This is the page of the app where the user is studying / working
 * * It diaplays the timer and todo items that they created on the nooking setup page
 **/
export function Nooking() {
	useGetState() // keeps the gameInterface persistant through closing and opening the extension
	const theme = useTheme()
	const history = useHistory() // routes history
	const { url } = DomainContainer.useContainer()

	//* Delete the timer and route the user to the dashboard
	async function handleStopNooking() {
		// deleteing timer in the database
		const response = await fetch(`${url}/api/delete_timer`)
		if (!response.ok) {
			console.error("Error deleting timer: " + response.statusText)
		}

		// Set nooking session to false here
		const isNooking = false
		chrome.storage.sync.set({ key: isNooking })

		// routing user to dashboard
		history.push("/dashboard")
	}

	return (
		<ThemeProvider theme={theme}>
			<Paper elevation={2}>
				<GameInterface />
			</Paper>
			<Fab color="primary" onClick={handleStopNooking} sx={{ bottom: 274, left: 330, position: "fixed", zIndex: 1 }}>
				<CloseIcon fontSize="large" />
			</Fab>
			<TodoList />
		</ThemeProvider>
	)
}

function GameInterface() {
	const { currentUser } = ContextContainer.useContainer()

	// Set the background image
	const imageStyle = {
		backgroundImage: `url(${backgrounds[currentUser.currentBackground]})`,
	}

	//* SET COLOR FUNCTION - Change the font colour depending on the color of the background
	function setColor() {
		if (
			currentUser.currentBackground === "zone5" ||
			currentUser.currentBackground === "zone6" ||
			currentUser.currentBackground === "zone7" ||
			currentUser.currentBackground === "zone9"
		) {
			return "white"
		}
		return "black"
	}

	return (
		<Box
			color={setColor}
			component="div"
			style={imageStyle}
			sx={{
				width: "400px",
				height: "300px",
				backgroundSize: "525px 300px",
				backgroundPosition: "center",
				display: "block",
				p: 0,
				m: 0,
			}}
		>
			<Box
				sx={{
					position: "relative",
					display: "inline-flex",
					left: 5,
					top: 0,
					right: 400,
					bottom: 290,
					fontFamily: "Orbitron",
					fontWeight: 800,
					fontSize: 32,
					letterSpacing: 3,
					pl: 1,
				}}
			>
				<Timer />
			</Box>
			<Box component="img" src={images[currentUser.currentAvatar]} sx={{ height: "180", position: "relative", display: "block", left: 210, top: 50 }} />
		</Box>
	)
}
