import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { ContextContainer } from "../../contexts/ContextContainer";

export function Logout() {
	const { setIsLoggedIn } = ContextContainer.useContainer();
	const [redirect, setRedirect] = useState<string | null>(null);

	async function handleLogout() {
		//hitting the backend route of /logoutUser with the body of necessary values
		try {
			const response = await fetch("/api/logout_user", {
				method: "POST",
			});
			//awaiting the response to comeback and turn it into readable json data
			const data = await response.json();
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
			if (data.isValid) {
				setIsLoggedIn(false);
				setRedirect("/login");
			}
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Button variant="contained" color="secondary" onClick={handleLogout}>
				Logout
			</Button>
		</>
	);
}
