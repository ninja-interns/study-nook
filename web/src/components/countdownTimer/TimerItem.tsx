// Import Dependencies
import * as React from "react"

// Import Interfaces
import { TimerItemInterface } from "./interfaces"

// Timer Component
const Timer = (props: TimerItemInterface) => {
	return (
		<div className="timer-component">
			{/* This renders the counter of the timer */}
			<div className="timer-input-wrapper">
				<input value={props.timer.timerNum} />
			</div>

			<div className="buttons">
				<button className="pause-button">onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTimerPause}</button>
				<button className="reset-button">Reset</button>
			</div>
		</div>
	)
}

export default Timer
