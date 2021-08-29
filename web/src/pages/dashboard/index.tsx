<<<<<<< HEAD
import { Typography } from "@material-ui/core";
import React from "react";
import { Logout } from "../../components/logout";

export function Dashboard() {
	//TRYING TO check my cookies for a specific cookie
	// function readCookie(name: any) {
	// 	var nameEQ = name + "=";
	// 	var ca = document.cookie.split(";");
	// 	for (var i = 0; i < ca.length; i++) {
	// 		var c = ca[i];
	// 		while (c.charAt(0) === " ") c = c.substring(1, c.length);
	// 		if (c.indexOf(nameEQ) === 0) {
	// 			console.log(c.substring(nameEQ.length, c.length));
	// 		}
	// 	}
	// 	console.log("nothing");
	// }
=======
import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Logout } from "../../components";
import { AuthContainer } from "../../containers/AuthContainer";
import { useGetState } from "./../../utils/getState";

export function Dashboard() {
	useGetState();
	const { currentUser } = AuthContainer.useContainer();
	const history = useHistory();
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048

	return (
		<div>
			<Logout />
<<<<<<< HEAD
			{/* <button onClick={() => readCookie("session")}>Cookie</button> */}
			<Typography variant="body1">DASHBOARD!!!!!!!!!!</Typography>
=======
			<Typography variant="body1">Welcome to your StudyNook Dashboard, {currentUser.name}!</Typography>
			<Button onClick={() => history.push("/profile")}>Profile</Button>
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048
		</div>
	);
}
