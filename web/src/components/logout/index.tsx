import { useState } from "react"
import { Redirect, Route } from "react-router-dom"
import { ContextContainer } from "../../contexts/ContextContainer"

export function Logout() {
	const { setIsLoggedIn } = ContextContainer.useContainer()
	const [redirect, setRedirect] = useState<string | null>(null)

	async function handleLogout() {
		//hitting the backend route of /logoutUser with the body of necessary values
		try {
			const response = await fetch("http://localhost:8080/api/logout_user", {
				method: "POST",
			})
			//awaiting the response to comeback and turn it into readable json data
			const data = await response.json()
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
			if (data.isValid) {
				setIsLoggedIn(true)
				setRedirect("/login")
			}
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<div>
			<Route render={() => (redirect !== null ? <Redirect to={redirect} /> : null)} />
			<p onClick={handleLogout}>Logout</p>
		</div>
	)
}
