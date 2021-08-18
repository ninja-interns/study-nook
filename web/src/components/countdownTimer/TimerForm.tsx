// Import dependencies
import * as React from "react"
import { v4 as uuidv4 } from "uuid"

// Import interfaces
import { TimerInterface, TimerFormInterface } from "./interfaces"

const TimerForm = (props: TimerFormInterface) => {
	// Create reference for form input
	const inputRef = React.useRef<HTMLInputElement>(null)
	// Create form state
	const [formState, setFormState] = React.useState("")

	// Handle timer input change
	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		// Update form state with number from input
		setFormState(event.target.value)
	}

	// Handle 'Enter' in todo input
	function handleInputEnter(event: React.KeyboardEvent) {
		// Check for 'Enter' key
		if (event.key === "Enter") {
			// Prepare new timer object
			const newTimer: TimerInterface = {
				id: uuidv4(),
				timerNum: Number(formState),
				isPaused: false,
			}

			// Create new timer item
			props.handleTimerCreate(newTimer)

			// Reset the input field OR remove the input field?
			if (inputRef && inputRef.current) {
				inputRef.current.value = ""
			}
		}
	}

	return (
		<div className="timer-form">
			<input ref={inputRef} type="text" placeholder="0:00" onChange={(event) => handleInputChange(event)} onKeyPress={(event) => handleInputEnter(event)} />
		</div>
	)
}

export default TimerForm
