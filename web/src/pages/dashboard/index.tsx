import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { DeleteAccount, Logout } from "../../components";
import { AuthContainer } from "../../contexts/AuthContainer";
import { useGetState } from "./../../utils/getState";

export function Dashboard() {
	useGetState();
	const { currentUser } = AuthContainer.useContainer();
	const history = useHistory();

	return (
		<div>
			<Logout />
			<DeleteAccount />
			<Typography variant="body1">Welcome to your StudyNook Dashboard, {currentUser.name}!</Typography>
			<Button onClick={() => history.push("/profile")}>Profile</Button>
			<Link to="/updateUser">Update User</Link>
			<Link to="/updatePassword">Update Password</Link>
		</div>
	);
}
