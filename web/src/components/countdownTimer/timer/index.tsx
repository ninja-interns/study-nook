import * as React from "react"
import { TimerInterface } from "../interfaces"
import { Typography } from "@material-ui/core"
import { Card, CardContent } from "@mui/material"

/**
 * * TIMER COMPONENT
 * * Creates a new timer on render and displays the time remaining
 * * If there is no timer in the database it will display "No Timer"
 * * Once the timer has finished it will display "Finished"
 */
const Timer = () => {
	const [timer, setTimer] = React.useState<TimerInterface>()
	const [mounted, setMounted] = React.useState(false) // Mounted runs createTimer before getTimeLeft
	const [ticker, setTicker] = React.useState<number>(0) // The ticker increments every second

	//* Requests the API to create a new timer - runs once on render
	React.useEffect(() => {
		async function createTimer() {
			// Sends request to the API to create the timer (Uses the duration stored in the database)
			const response = await fetch("/api/create_timer")

			// If there is no timer duration in the database display "No Timer"
			if (response.status === 404) {
				const newTimer: TimerInterface = {
					time_left: "No Timer",
					timer_duration: 0,
					is_completed: false,
				}
				setTimer(newTimer)
			} else if (!response.ok) {
				console.error("Error creating timer: " + response.statusText)
			} else {
				setMounted(true)
			}
		}
		createTimer()
	}, [])

	//* Gets time remaining from API - Runs if mounted and when the ticker increments
	React.useEffect(() => {
		if (mounted) getTimeLeft()

		async function getTimeLeft() {
			// Sends request to the API to calculate and return time remaining on the timer
			const response = await fetch("/api/get_time_left")
			if (response.ok) {
				const data: TimerInterface = await response.json()
				if (data.time_left === "0s" || data.is_completed === true) {
					data.time_left = "Finished"
					setMounted(false)
					setCompleted()
				}
				setTimer(data)
			}
			// If there is no timer duration in the database display "No Timer"
			else if (response.status === 404) {
				const newTimer: TimerInterface = {
					time_left: "No Timer",
					timer_duration: 0,
					is_completed: false,
				}
				setTimer(newTimer)
				setMounted(false)
			} else {
				console.error("Error getting time left: " + response.statusText)
				setMounted(false)
			}
		}
	}, [mounted, ticker])

	//* Requests the API to set the timer to completed
	async function setCompleted() {
		const response = await fetch("/api/set_completed")
		if (!response.ok) {
			console.error("Error setting timer isCompleted: " + response.statusText)
		}
	}

	//* Increments the ticker every second - Runs if mounted
	React.useEffect(() => {
		if (mounted) {
			const interval = setInterval(() => {
				setTicker((ticker) => ticker + 1)
			}, 1000)
			return () => clearInterval(interval)
		}
	}, [mounted])

	return (
		<Card sx={{ display: "flex", width: "50%" }}>
			<CardContent>
				<Typography variant="h4">{timer?.time_left}</Typography>
			</CardContent>
		</Card>
	)
}

export default Timer
