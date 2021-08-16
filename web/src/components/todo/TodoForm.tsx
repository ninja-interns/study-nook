import React, { useState } from "react"

function TodoForm() {
	//Declare a new state variable called "input"
	const [input, setInput] = useState("")

	//Stops the page from reloading when you click the Add todo button
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
	}

	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			<input type="text" placeholder="Add a to" value={input} name="text" className="todo-input" />
			<button className="todo-button">Add todo</button>
		</form>
	)
}

export default TodoForm
