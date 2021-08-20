// Import Dependencies
import * as React from "react"
import { ReactDOM } from "react"

// Import Interfaces
import { TimerItemInterface } from "./interfaces"

// Timer Component
const Timer = (props: TimerItemInterface) => {
	function startTimer() {}

	return (
		<div className="timer-component">
			{/* This renders the counter of the timer */}
			<div className="timer-input-wrapper">
				<span>{props.timer.timerHours}:</span>
				<span>{props.timer.timerMinutes}</span>
			</div>

			<div className="buttons">
				<button className="pause-button">Pause</button>
				<button className="reset-button">Reset</button>
			</div>
		</div>
	)
}

export default Timer
