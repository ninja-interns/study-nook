import React from "react"
import { ExamplePage } from "./pages"
import { TodoListApp } from "./components/todo"
import { TimerApp } from "./components/countdownTimer"

function App() {
	return (
		<div className="App">
			<TodoListApp />
			<TimerApp />
		</div>
	)
}

export default App
