import { Button, Paper, Stack } from "@mui/material"
import * as React from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import { GameInterface } from "../../components"
import { Timer } from "../../components/countdownTimer/timer/index"
import { TodoList } from "../../components/todoList/list"
import { DomainContainer } from "../../contexts/DomainContext"

/**
 * * NOOKING PAGE
 * * This is the page of the app where the user is studying / working
 * * It diaplays the timer and todo items that they created on the nooking setup page
 **/
export function Nooking() {
	const { url } = DomainContainer.useContainer()
	const [redirect, setRedirect] = React.useState<string | null>(null)

	//* Delete the timer and route the user to the dashboard
	async function handleStopNooking() {
		setRedirect("/dashboard")

		//! Comment
		const response = await fetch(`${url}/api/delete_timer`)
		if (!response.ok) {
			console.error("Error deleting timer: " + response.statusText)
		}

		// Set nooking session to true here
		const isNooking = false
		chrome.storage.sync.set({ key: isNooking }, function () {
			console.log("Nooking is set to " + isNooking)
		})
	}

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
				<Stack direction="row" justifyContent="center" alignItems="center" spacing={10}>
					<Timer />
					<Button variant="contained" onClick={handleStopNooking}>
						Stop Nooking
					</Button>
				</Stack>
				<Paper elevation={2}>{/* <GameInterface /> */}</Paper>
				<TodoList />
			</Stack>
		</>
	)
}
