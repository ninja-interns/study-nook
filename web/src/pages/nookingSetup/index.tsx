import { Button } from "@mui/material"
import { useHistory } from "react-router-dom"
import AppBarComponent from "../../components/appBar"
import { TimerForm } from "../../components/countdownTimer/form"
import { TodoListApp } from "../../components/todoList/form"

/**
 * * NOOKING SETUP PAGE
 * * This is the page of the app where the user sets up their todo list and timer duration
 * * The timer will not be created until the user clicks the "Start Nooking" button
 **/
export function NookingSetup() {
	const history = useHistory() // routes history

	return (
		<>
			<AppBarComponent />
			<TimerForm />
			<TodoListApp />
			<Button onClick={() => history.push("/nooking")}>Start Nooking</Button>
		</>
	)
}
