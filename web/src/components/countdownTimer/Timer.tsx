// import dependencies
import { Button } from "@material-ui/core"
import * as React from "react"
import { TextField } from "@material-ui/core"
// import { useHistory } from "react-router-dom"

function Timer() {
	const timerDurationRef = React.useRef<HTMLInputElement>()

	//const history = useHistory()

	async function handleCreateTimer(error: React.FormEvent<HTMLFormElement>) {
		// Prevent the page from reloading
		error.preventDefault()

		// Do not send the data to DB if the number is not a number?

		// Adding to DB
		const response = await fetch("/api/createTimer", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				timerDuration: timerDurationRef?.current?.value,
			}),
		})

		if (response.ok) {
			return await response.json()
		} else {
			const errorMessage = await response.text()
			return Promise.reject(new Error(errorMessage))
		}
	}

	// HAVE NOT FINISHED THIS YET
	// async function fetchTimeRemaining(error: React.FormEvent<HTMLFormElement>) {
	// 	// Prevent the page from reloading
	// 	error.preventDefault()

	// 	// Do not send the data to DB if the number is not a number?

	// 	// Adding to DB
	// 	const response = await fetch("/api/createTimer", {
	// 		method: "POST",
	// 		headers: { "content-type": "application/json" },
	// 		body: JSON.stringify({
	// 			timerDuration: timerDurationRef?.current?.value,
	// 		}),
	// 	})

	// 	if (response.ok) {
	// 		return await response.json()
	// 	} else {
	// 		const errorMessage = await response.text()
	// 		return Promise.reject(new Error(errorMessage))
	// 	}
	// }

	return (
		<div>
			<form onSubmit={handleCreateTimer}>
				<TextField inputRef={timerDurationRef} type="text">
					Put Number Here
				</TextField>
				<Button type="submit">Click Me</Button>
			</form>
		</div>
	)
}

export { Timer }
