import React from "react"
import { TodoListApp } from "./components"
import { TimerApp } from "./components/countdownTimer"
import { AuthContainer } from "./containers/AuthContainer"
import Routes from "./routes/Routes"

function App() {
	return (
		<AuthContainer.Provider>
			<Routes />
			<TodoListApp />
			<TimerApp />
		</AuthContainer.Provider>
	)
}
export default App
