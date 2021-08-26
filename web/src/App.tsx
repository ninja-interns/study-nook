import React from "react"
import { TodoListApp } from "./components"
import { TimerApp } from "./components/countdownTimer"
import Routes from "./routes/Routes"

function App() {
	return (
		<div>
			<TodoListApp />
			<TimerApp />
		</div>
	)
}
export default App
