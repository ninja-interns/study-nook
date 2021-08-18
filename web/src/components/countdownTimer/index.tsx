// Import dependencies
import * as React from "react"
import { render } from "react-dom"

// Import Components
import TimerForm from "./TimerForm"
import Timer from "./TimerItem"

// Import Interfaces
import { TimerInterface } from "./interfaces"

// TimerApp Component
export const TimerApp = () => {
	// Add comment here
	const [timer, setState] = React.useState<TimerInterface>()

	// Creating new Timer
	function handleTimerCreate(timer: TimerInterface) {
		// Prepare new timers state
		const newTimerState: TimerInterface = timer

		// Update timers state
		setState(newTimerState)
	}

	// Pause the timer
	function handleTimerPause() {}

	// Reset the timer
	function handleTimerReset(timer: TimerInterface) {
		// Prepare new timers state
		const newTimerState: TimerInterface = timer

		// Update timers state
		setState(newTimerState)
	}

	return (
		<div className="timer-app">
			<h1>Timer</h1>
			<TimerForm handleTimerCreate={handleTimerCreate} />
		</div>
	)
}

const rootElement = document.getElementById("root")
render(<TimerApp />, rootElement)
