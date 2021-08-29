<<<<<<< HEAD
import React from "react";
import { Button } from "@material-ui/core";
=======
import { Button } from "@material-ui/core";
import React from "react";
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048
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
<<<<<<< HEAD
		<Button variant="contained" onClick={handleLogout}>
=======
		<Button variant="contained" color="secondary" onClick={handleLogout}>
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048
			Logout
		</Button>
	);
}
