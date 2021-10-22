import { Box, Button, Paper, Stack } from "@mui/material"
import { useHistory } from "react-router-dom"
import { Timer } from "../../components/countdownTimer/timer/index"
import { TodoList } from "../../components/todoList/list"
import { DomainContainer } from "../../contexts/DomainContext"
import { ContextContainer } from "../../contexts/ContextContainer"
import images from "../../assets/Avatars"
import backgrounds from "../../assets/Backgrounds"
import { useGetState } from "./../../utils/getState"
/**
 * * NOOKING PAGE
 * * This is the page of the app where the user is studying / working
 * * It diaplays the timer and todo items that they created on the nooking setup page
 **/
export function Nooking() {
	useGetState() // keeps the gameInterface persistant through closing and opening the extension
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
		<Box>
			<Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
				<Stack direction="row" justifyContent="center" alignItems="center" spacing={6}>
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
		</Box>
	)
}

function GameInterface() {
	const { currentUser } = ContextContainer.useContainer()

	const imageStyle = {
		backgroundImage: `url(${backgrounds[currentUser.currentBackground]})`,
	}

	return (
		<Box
			component="div"
			style={imageStyle}
			sx={{
				width: "350px",
				height: "200px",
				border: "solid black",
				borderWidth: "1px",
				backgroundSize: "350px 200px",
				display: "block",
				p: 0,
			}}
		>
			<Box
				component="img"
				src={images[currentUser.currentAvatar]}
				sx={{ width: "80", height: "120", position: "relative", display: "block", left: "120px", top: "70px", bottom: "0px" }}
			/>
		</Box>
	)
}
