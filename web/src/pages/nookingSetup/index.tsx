import { Box, Button, Fade } from "@mui/material"
import { useHistory } from "react-router-dom"
import NavigationBar from "../../components/bottomNavigation"
import { TimerForm } from "../../components/countdownTimer/form"
import { TodoListApp } from "../../components/todoList/form"
import { useStyles } from "../dashboard/dashboardCss"

/**
 * * NOOKING SETUP PAGE
 * * This is the page of the app where the user sets up their todo list and timer duration
 * * The timer will not be created until the user clicks the "Start Nooking" button
 **/
const NookingSetup = () => {
	const history = useHistory() // routes history
	const css = useStyles()

	//* Set the nooking session to true in local storage and routing user to nooking page
	const handleNookingSession = () => {
		const isNooking = true
		chrome.storage.sync.set({ key: isNooking })

		history.push("/nooking")
	}

	return (
		<>
			<Fade in={true} timeout={1000}>
				<Box
					component="div"
					sx={{
						pt: 2,
						pb: 2,
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
					<Box sx={{ gridArea: "form", pl: 2, pr: 2 }}>
						<TimerForm />
					</Box>
					<Box sx={{ gridArea: "list" }}>
						<TodoListApp />
					</Box>
					<Box sx={{ gridArea: "button", pr: 2, pl: 2 }}>
						<Button fullWidth variant="contained" onClick={handleNookingSession} sx={{ alignContent: "center" }}>
							Start Nooking
						</Button>
					</Box>
				</Box>
			</Fade>
			<NavigationBar />
		</>
	)
}

export { NookingSetup }
