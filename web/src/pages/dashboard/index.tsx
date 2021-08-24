import React from "react";
import { } from "../../components";
import { Button } from "@material-ui/core";
import { useStyles } from "./dashboardCss";
import { useHistory } from "react-router";

export function DashboardPage() {
	const css = useStyles();
	const history = useHistory();

	return (
		<div className={css.container}>
			<Button className={css.menuButton} variant="contained" color="primary" onClick={() => history.push("../menu")}>
				Menu
			</Button>
		</div >
	);
}
