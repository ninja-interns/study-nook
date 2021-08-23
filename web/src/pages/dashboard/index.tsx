import React from "react";
import { Typography } from "@material-ui/core";
import { Logout } from "../../components";

export function Dashboard() {
	return (
		<div>
			<Logout />
			<Typography variant="body1">DASHBOARD!!!!!!!!!!</Typography>
		</div>
	);
}
