import { Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useStyles } from "./homeCss";

export function Home() {
	const css = useStyles();
	const [redirect, setRedirect] = useState<string | null>(null);

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<div className={css.container}>
				<Typography variant="h3">StudyNookLogo📚</Typography>

				<div className={css.buttonContainer}>
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
				</div>
			</div>
		</>
	);
}
