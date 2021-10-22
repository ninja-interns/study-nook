import * as React from "react"
import { TimerInterface } from "../interfaces"
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Box,
	Paper,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	OutlinedInput,
} from "@mui/material"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

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
			timeLeft: 0,
			timerDuration: Number(event.target.value),
			isCompleted: false,
		}
		createTimerDuration(newTimer)
	}

	//* Posts the new timer duration to the database
	async function createTimerDuration(newTimer: TimerInterface) {
		// Sends request to the API to initialise a new timer with the timer duration
		const response = await fetch("http://localhost:8080/api/init_timer", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(newTimer),
		})
		if (!response.ok) {
			console.error("Error setting timer duration: " + response.statusText)
		}
	}

	//* MUI Component
	const [open, setOpen] = React.useState(false)
	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
		if (reason !== "backdropClick") {
			setOpen(false)
		}
	}
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	}

	return (
		<Paper elevation={3} sx={{ pt: 1, pb: 1, textAlign: "center" }}>
			<Button onClick={handleClickOpen} size="large" sx={{ fontSize: 26 }}>
				{duration}:00
			</Button>
			<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
				<DialogTitle>Change Timer Duration</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
						<FormControl fullWidth sx={{ m: 1 }}>
							<InputLabel>Timer Duration</InputLabel>
							<Select value={duration} onChange={handleChange} input={<OutlinedInput label="Timer Duration" />} MenuProps={MenuProps}>
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
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Ok</Button>
				</DialogActions>
			</Dialog>
		</Paper>
	)
}

export { TimerForm }
