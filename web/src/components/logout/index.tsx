import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export function Logout() {
	const history = useHistory();

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
				history.push("/login");
			}
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<Button variant="contained" onClick={handleLogout}>
			Logout
		</Button>
	);
}
