import * as React from "react"
import { TimerInterface } from "../interfaces"
import { Typography } from "@material-ui/core"
import { Box, Card, CardContent, CircularProgress } from "@mui/material"

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
	const [timeLeft, setTimeLeft] = React.useState<String>("")

	//* Requests the API to create a new timer - runs once on render
	React.useEffect(() => {
		async function createTimer() {
			// Sends request to the API to create the timer (Uses the duration stored in the database)
			const response = await fetch("/api/create_timer")

			// If there is no timer duration in the database display "No Timer"
			if (response.status === 404) {
				const newTimer: TimerInterface = {
					timeLeft: 0,
					timerDuration: 0,
					isCompleted: false,
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

		// Sends request to the API to calculate and returns time remaining on the timer
		async function getTimeLeft() {
			const response = await fetch("/api/get_time_left")
			if (response.ok) {
				const data: TimerInterface = await response.json()
				if (data.timeLeft === 0 || data.isCompleted === true) {
					//! data.timeLeft = "Finished"
					setMounted(false)
					setCompleted()
				} else if (data.timeLeft) {
					// Convert the timeLeft (seconds) to minutes and seconds
					var timeLeftString = new Date(data?.timeLeft * 1000).toISOString().substr(14, 5)
					setTimeLeft(timeLeftString)
				}
				setTimer(data)
			}
			// If there is no timer duration in the database display "No Timer"
			else if (response.status === 404) {
				const newTimer: TimerInterface = {
					timeLeft: 0,
					timerDuration: 0,
					isCompleted: false,
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

	//! Circular Progress Circle
	const [progress, setProgress] = React.useState(0)
	//? Could put this in with the ticker?
	React.useEffect(() => {
		const timerProgress = timer.setProgress(timerProgress)

		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10))
		}, 800)
		return () => {
			clearInterval(timer)
		}
	}, [ticker])

	return (
		<Box sx={{ position: "relative", display: "inline-flex" }}>
			<CircularProgress variant="determinate" value={progress} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: "absolute",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography variant="caption" component="div">
					{timeLeft}
				</Typography>
			</Box>
		</Box>
	)
}

export { Timer }
