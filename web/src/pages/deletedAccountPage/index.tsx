import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStyles } from "./deletedAccountPageCss";

export function DeletedAccount() {
	const history = useHistory();
	const css = useStyles();
	return (
		<div className={css.container}>
			<Typography>StudyNookLogo📚</Typography>
			<Typography variant="subtitle1">We've successfully deleted you're account and we're sorry to see you go!</Typography>
			<Typography>Reach out to us at studynookapp@gmail.com if you have anything you want to share.</Typography>
			<Button className={css.button} variant="contained" color="primary" onClick={() => history.push("/registration")}>
				Register
			</Button>
		</div>
	);
}
