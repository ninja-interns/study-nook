<<<<<<< HEAD
import Button from "@material-ui/core/Button"
import React, { useState } from "react"
import { Redirect, Route } from "react-router-dom"
import { useStyles } from "./homeCss"

export function Home() {
	const css = useStyles()
	const [redirect, setRedirect] = useState<string | null>(null)
=======
import { Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { ContextContainer } from "../../contexts/ContextContainer";
import { useStyles } from "./homeCss";
import { useHistory } from "react-router";

export function Home(): JSX.Element {
	const css = useStyles();
	const [redirect, setRedirect] = useState<string | null>(null);
	const { isLoggedIn } = ContextContainer.useContainer();
	const history = useHistory();

	if (isLoggedIn) {
		history.push("/dashboard");
	}
>>>>>>> d2b5e9b056b859125bc141a27c27ed87a2ea864c

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<div className={css.container}>
<<<<<<< HEAD
				<div className={css.verticalCenter}>
					<h3 className={css.imageCss}>Cute Image Here</h3>
				</div>

				<div className={css.buttonsClass}>
					<div className={css.left}>
						<Button
							onClick={() => {
								setRedirect("/registration")
							}}
							variant="contained"
							color="primary"
						>
							Create Account
						</Button>
					</div>

					<div className={css.right}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								setRedirect("/login")
							}}
						>
							Login
						</Button>
					</div>
=======
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
>>>>>>> d2b5e9b056b859125bc141a27c27ed87a2ea864c
				</div>
			</div>
		</>
	)
}
