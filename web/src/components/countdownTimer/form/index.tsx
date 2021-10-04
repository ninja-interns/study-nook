import * as React from "react"
import { TimerInterface } from "../interfaces"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

/**
 * * TIMER FORM COMPONENT
 * * Form component that adds the timer duration to the database
 * * It takes the timer duration from the user using a drop down menu
 * * If the user selects a different duration the old duration is deleted before a new one is created
 **/
const TimerForm = () => {
	const [duration, setDuration] = React.useState(0)

	//* Updates the timer duration whenever the input is changed timer.IsCompleted = true
	function handleChange(event: SelectChangeEvent<number>) {
		// Update the MUI select component
		setDuration(Number(event.target.value))

		// Create new timer duration
		const newTimer: TimerInterface = {
			timeLeft: "",
			timerDuration: Number(event.target.value),
			isCompleted: false,
		}
		createTimerDuration(newTimer)
	}

	//* Posts the new timer duration to the database
	async function createTimerDuration(newTimer: TimerInterface) {
		// Sends request to the API to initialise a new timer with the timer duration
		const response = await fetch("/api/init_timer", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(newTimer),
		})
		if (!response.ok) {
			console.error("Error setting timer duration: " + response.statusText)
		}
	}

	return (
		<>
			<FormControl
				fullWidth
				variant="outlined"
				sx={{
					mt: 1,
				}}
			>
				<InputLabel htmlFor="outlined-age-native-simple">Timer Duration</InputLabel>
				<Select value={duration} label="Timer Duration" onChange={handleChange}>
					<MenuItem value={0}>0</MenuItem>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={15}>15</MenuItem>
					<MenuItem value={20}>20</MenuItem>
					<MenuItem value={25}>25</MenuItem>
					<MenuItem value={30}>30</MenuItem>
					<MenuItem value={35}>35</MenuItem>
					<MenuItem value={40}>40</MenuItem>
					<MenuItem value={45}>45</MenuItem>
					<MenuItem value={50}>50</MenuItem>
					<MenuItem value={55}>55</MenuItem>
					<MenuItem value={60}>60</MenuItem>
				</Select>
			</FormControl>
		</>
	)
}

export { TimerForm }
