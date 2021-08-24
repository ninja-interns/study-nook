// Import dependencies
import * as React from "react"
import { v4 as uuidv4 } from "uuid"
import Button from "@material-ui/core/Button"
import { useTimer } from "use-timer"
import ButtonGroup from "@material-ui/core/ButtonGroup"

// Import interfaces
import { TimerInterface, TimerFormInterface } from "./interfaces"
import { TextField } from "@material-ui/core"

const TimerForm = (props: TimerFormInterface) => {
	// Create reference for form input
	const inputHoursRef = React.useRef<HTMLInputElement>(null)
	//const inputMinutesRef = React.useRef<HTMLInputElement>(null)

	// Create form state
	const [hoursFormState, setHoursFormState] = React.useState("")
	//const [minutesFormState, setMinutesFormState] = React.useState("")

	// Handle timer input change - this is where the input error is
	function handleHoursInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		// Update form state with number from hours
		setHoursFormState(event.target.value)
	}

	function handleSubmit(event: React.FormEvent) {
		// Prevent the page refreshing
		event.preventDefault()

		// Prepare new timer object
		const newTimer: TimerInterface = {
			id: uuidv4(),
			timerHours: Number(hoursFormState),
			timerMinutes: 0,
			timerSeconds: 0,
		}

		// Create new timer item
		props.handleTimerCreate(newTimer)

		// Reset the input field OR could try to remove the input field?
		if (inputHoursRef && inputHoursRef.current) {
			inputHoursRef.current.value = ""
		}
	}

	//function createTimer(initTime: number, interval: number) {
	const { time, start, pause, reset, status } = useTimer({
		initialTime: 100,
		timerType: "DECREMENTAL",
		interval: 1000,
		endTime: 0,
	})

	return (
		<div>
			<form onSubmit={(event) => handleSubmit(event)}>
				<TextField
					// Material UI
					label="Hours"
					id="outlined-basic"
					variant="outlined"
					// --
					inputRef={inputHoursRef}
					type="text"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleHoursInputChange(event)}
				/>

				<Button type="submit">Submit</Button>
			</form>

			<div className="timer-component">
				<p>{time}</p>
				<ButtonGroup variant="contained">
					<Button className="start-button" onClick={start}>
						Start
					</Button>
					<Button className="pause-button" onClick={pause}>
						Pause
					</Button>
					<Button className="reset-button" onClick={reset}>
						Reset
					</Button>
				</ButtonGroup>
				<p></p>
			</div>
		</div>
	)
}

export default TimerForm

// add 30 minutes to the current time then countdown to that time?
// save the timer on a cookie?
