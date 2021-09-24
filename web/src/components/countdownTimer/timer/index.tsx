// ! If you refresh the page the old timer is deleted and a new one is made
//! Explanation of component
import { Typography } from "@material-ui/core"
import { Card, CardContent } from "@mui/material"
import * as React from "react"
import { TimerInterface } from "../interfaces"

const Timer = () => {
	const [mounted, setMounted] = React.useState(false)
	const [timer, setTimer] = React.useState<TimerInterface>()
	const [ticker, setTicker] = React.useState<number>(0)

	//! Explanation of function
	React.useEffect(() => {
		async function createTimer() {
			const response = await fetch("/api/createTimer")
			if (!response.ok) {
				console.error("Error creating timer: " + response.statusText)
			}
		}
		createTimer()
		setMounted(true)
	}, [])

	//! Explanation of function
	React.useEffect(() => {
		if (mounted) getTimeLeft()

		//! Explanation of function
		async function getTimeLeft() {
			const response = await fetch("/api/getTimeLeft")
			if (response.ok) {
				const data: TimerInterface = await response.json()
				if (data.time_left === "0s") {
					data.time_left = "Finished"
					setMounted(false)
					setCompleted()
				}
				setTimer(data)
			} else {
				console.error("Error getting time left: " + response.statusText)
			}
		}
	}, [mounted, ticker])

	//! Explanation of function
	async function setCompleted() {
		const response = await fetch("/api/setCompleted")
		if (!response.ok) {
			console.error("Error setting timer isCompleted: " + response.statusText)
		}
	}

	//! Explanation of function
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
