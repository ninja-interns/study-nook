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

	return (
		<div>
			<Logout />
			<Typography variant="body1">Welcome to your StudyNook Dashboard, {currentUser.name}!</Typography>
			<Button onClick={() => history.push("/profile")}>Profile</Button>
		</div>
	);
}
