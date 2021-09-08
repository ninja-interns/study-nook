// Import dependencies
import * as React from "react"
import { v4 as uuidv4 } from "uuid"

// Import Components
import { TimerForm } from "./Form"
import { Timer } from "./Timer"

// Import Interfaces
import { TimerInterface } from "./interfaces"

// TimerApp Component
function TimerApp() {
	// This state represents a Timer object
	const [timer, setState] = React.useState<TimerInterface>({ id: uuidv4(), timerHours: 0, timerMinutes: 0, timerSeconds: 0 })

	// Creating new Timer
	function handleTimerCreate(timer: TimerInterface) {
		// Prepare new timers state
		const newTimerState: TimerInterface = timer

		// Update timers state
		setState(newTimerState)
	}

	return (
		<div className="timer-app">
			<h1>Timer</h1>
			<TimerForm timer={timer} handleTimerCreate={handleTimerCreate} />
			<Timer />
		</div>
	)
}
export { TimerApp }
