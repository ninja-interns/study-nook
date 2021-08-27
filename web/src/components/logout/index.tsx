import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { AuthContainer } from "../../containers/AuthContainer";

export function Logout() {
	const history = useHistory();
	const { setIsLoggedIn } = AuthContainer.useContainer();

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
				history.push("/login");
			}
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<Button variant="contained" color="secondary" onClick={handleLogout}>
			Logout
		</Button>
	);
}
