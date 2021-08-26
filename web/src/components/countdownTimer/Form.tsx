// Import dependencies
import * as React from "react"
import { v4 as uuidv4 } from "uuid"
import Button from "@material-ui/core/Button"
import { useTimer } from "use-timer"
import ButtonGroup from "@material-ui/core/ButtonGroup"

// Import interfaces
import { TimerInterface, TimerFormInterface } from "./interfaces"
import { TextField } from "@material-ui/core"

export const TimerForm = (props: TimerFormInterface) => {
	// Create reference for form input
	const timerRef = React.useRef<HTMLInputElement>(null)

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		// Prevent the page refreshing
		event.preventDefault()

		// This is where we access the database

		// Reset the input field OR could try to remove the input field?
		if (timerRef && timerRef.current) {
			timerRef.current.value = ""
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
			{/* This is the form that takes in the timer input */}
			<form onSubmit={handleSubmit}>
				<TextField
					// Material UI
					label="Hours"
					id="outlined-basic"
					variant="outlined"
					// --
					inputRef={timerRef}
					type="text"
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

// add 30 minutes to the current time then countdown to that time?
// save the timer on a cookie?
