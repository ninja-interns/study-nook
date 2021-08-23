import { Typography } from "@material-ui/core";
import React from "react";
import { Logout } from "../../components/logout";
import { useAuth } from "./../../contexts/AuthProvider";

export function Dashboard() {
	const { isLoggedIn } = useAuth();
	function handleCookie() {
		console.log(document.cookie.includes("session"));
		console.log(isLoggedIn);
	}

	return (
		<div>
			<Logout />
			<button onClick={handleCookie}>Cookies</button>
			<Typography variant="body1">DASHBOARD!!!!!!!!!!</Typography>
		</div>
	);
}
