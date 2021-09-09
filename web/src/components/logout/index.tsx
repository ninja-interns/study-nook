import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AuthContainer } from "../../containers/AuthContainer";

export function Logout() {
	const { setIsLoggedIn } = AuthContainer.useContainer();
	const [redirect, setRedirect] = useState<string | null>(null);

	async function handleLogout() {
		//hitting the backend route of /logoutUser with the body of necessary values
		try {
			const response = await fetch("/api/logoutUser", {
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
		<Button variant="contained" onClick={handleLogout}>
			Logout
		</Button>
	);
}
