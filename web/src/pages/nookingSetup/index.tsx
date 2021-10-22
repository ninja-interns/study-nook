import { Box, Button } from "@mui/material"
import { useHistory } from "react-router-dom"
import NavigationBar from "../../components/bottomNavigation"
import { TimerForm } from "../../components/countdownTimer/form"
import { TodoListApp } from "../../components/todoList/form"

/**
 * * NOOKING SETUP PAGE
 * * This is the page of the app where the user sets up their todo list and timer duration
 * * The timer will not be created until the user clicks the "Start Nooking" button
 **/
export function NookingSetup() {
	const history = useHistory() // routes history

	//* Set the nooking session to true in local storage and routing user to nooking page
	const handleNookingSession = () => {
		const isNooking = true
		chrome.storage.sync.set({ key: isNooking })

		history.push("/nooking")
	}

	return (
		<Box>
			<TimerForm />
			<TodoListApp />
			<Button onClick={handleNookingSession}>Start Nooking</Button>
			<NavigationBar />
		</Box>
	)
}
