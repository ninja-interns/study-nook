// Import dependencies
import * as React from "react"
import { v4 as uuidv4 } from "uuid"
import Button from "@material-ui/core/Button"

// Import interfaces
import { TimerInterface, TimerFormInterface } from "./interfaces"
import { TextField } from "@material-ui/core"

const TimerForm = (props: TimerFormInterface) => {
	// Create reference for form input
	const inputHoursRef = React.useRef<HTMLInputElement>(null)
	const inputMinutesRef = React.useRef<HTMLInputElement>(null)
	// Create form state
	const [hoursFormState, setHoursFormState] = React.useState("")
	const [minutesFormState, setMinutesFormState] = React.useState("")

	// Handle timer input change - this is where the input error is
	function handleHoursInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		// Update form state with number from hours
		setHoursFormState(event.target.value)
	}

	function handleMinutesInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		// Update form state with number from minutes
		setMinutesFormState(event.target.value)
	}

	function handleSubmit() {
		// Prepare new timer object
		const newTimer: TimerInterface = {
			id: uuidv4(),
			timerHours: Number(hoursFormState),
			timerMinutes: Number(minutesFormState),
			timerSeconds: 0,
			isPaused: false,
		}

		// Create new timer item
		props.handleTimerCreate(newTimer)

		// Reset the input field OR could try to remove the input field?
		if (inputMinutesRef && inputMinutesRef.current && inputHoursRef && inputHoursRef.current) {
			inputMinutesRef.current.value = ""
			inputHoursRef.current.value = ""
		}
	}

	// This is also where the error is occuring
	return (
		<form>
			<div>
				<TextField
					ref={inputHoursRef}
					type="text"
					id="hours-input"
					placeholder="Hours"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleHoursInputChange(event)}
				/>
				<TextField
					ref={inputMinutesRef}
					type="text"
					id="hours-input"
					placeholder="Minutes"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleMinutesInputChange(event)}
				/>
			</div>

			<Button onClick={handleSubmit} variant="contained">
				Submit
			</Button>
		</form>
	)
}

export default TimerForm
