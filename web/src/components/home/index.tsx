import { Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { ContextContainer } from "../../contexts/ContextContainer";
import { useStyles } from "./homeCss";
import { useHistory } from "react-router";


export function Home() {
	const css = useStyles();
	const [redirect, setRedirect] = useState<string | null>(null);
	const { isLoggedIn } = ContextContainer.useContainer();
	const history = useHistory();

	if (isLoggedIn) {
		history.push("/dashboard");
	}

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<div className={css.container}>
				<Typography variant="h3">StudyNookLogo📚</Typography>

				<div className={css.buttonContainer}>
					<Button
						className={css.button}
						variant="contained"
						color="primary"
						onClick={() => {
							setRedirect("/login");
						}}
					>
						Login
					</Button>
					<Button
						className={css.button}
						onClick={() => {
							setRedirect("/registration");
						}}
						variant="contained"
						color="primary"
					>
						Register
					</Button>
				</div>
			</div>
		</>
	);
}
