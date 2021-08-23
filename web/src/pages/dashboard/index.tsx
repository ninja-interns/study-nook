import React from "react";
import { Typography } from "@material-ui/core";
import { Logout } from "../../components";
import { useAuth } from "../../contexts/AuthProvider";

export function Dashboard() {
	const { currentUser, isLoggedIn } = useAuth();

	return (
		<div>
			<Logout />
			<Typography variant="body1">Welcome to your StudyNook Dashboard, {currentUser.name}!</Typography>
		</div>
	);
}
