import { Typography, Button } from "@material-ui/core";
import React from "react";
import { Logout } from "../../components";
import { AuthContainer } from "../../containers/AuthContainer";
import { useGetState } from "./../../utils/getState";
import { useHistory } from "react-router-dom";

export function Dashboard() {
	useGetState();
	const history = useHistory();
	const { currentUser } = AuthContainer.useContainer();

	return (
		<div>
			<Logout />
			<Typography variant="body1">Welcome to your StudyNook Dashboard, {currentUser.name}!</Typography>
		</div>
	);
}
