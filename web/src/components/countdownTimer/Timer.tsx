// import dependencies
import { Button } from "@material-ui/core"
import * as React from "react"
import { useEffect } from "react"
import { TextField } from "@material-ui/core"
import { useHistory } from "react-router-dom"

export const Timer = () => {
	const [formState, setFormState] = React.useState("")
	const inputRef = React.useRef<HTMLInputElement>(null)
	const history = useHistory()

	function handleClick(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		console.log("I was clicked", event)
	}

	return (
		<div>
			<form onSubmit={handleClick}>
				<TextField inputRef={inputRef} type="text">
					Put Number Here
				</TextField>
				<Button type="submit">Click Me</Button>
			</form>
		</div>
	)
}
