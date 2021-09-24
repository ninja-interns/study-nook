//! Explanation of component

import * as React from "react"
import { TimerInterface } from "../interfaces"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

const TimerForm = () => {
	//! Explanation of function
	function handleChange(event: SelectChangeEvent<number>) {
		// Prepare new timer object
		const newTimer: TimerInterface = {
			isPaused: false,
			time_left: "",
			timer_duration: Number(event.target.value),
		}

		handleCreateTimer(newTimer)
	}

	//! Explanation of function
	function handleCreateTimer(newTimer: TimerInterface) {
		createTimerDuration(newTimer)
	}

	//! Explanation of function
	async function createTimerDuration(newTimer: TimerInterface) {
		const response = await fetch("/api/setTimerDuration", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(newTimer),
		})
		if (!response.ok) {
			console.error("Error setting timer duration: " + response.statusText)
		}
	}

	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="outlined-age-native-simple">Timer Duration</InputLabel>
			<Select defaultValue={25} label="Timer Duration" onChange={handleChange}>
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
	)
}

export default TimerForm
