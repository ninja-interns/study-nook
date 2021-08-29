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

	return (
		<div>
			<Logout />
			{/* <button onClick={() => readCookie("session")}>Cookie</button> */}
			<Typography variant="body1">DASHBOARD!!!!!!!!!!</Typography>
		</div>
	);
}
