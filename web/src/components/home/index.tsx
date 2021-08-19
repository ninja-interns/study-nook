import React from "react";
import { useStyles } from "./homeCss";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom";
import { useHistory } from 'react-router-dom';

export function Home() {
	const css = useStyles();
	const history = useHistory();

	return (
		<div className={css.container}>
			<div className={css.verticalCenter}>
				<h3 className={css.imageCss}>Cute Image Here</h3>


				<div className={css.buttonsClass}>
					<Button onClick={() => { history.push('/registration') }} variant="contained" color="primary">
						Sign up
					</Button>

					<Button onClick={() => { history.push('/login') }} variant="contained" color="primary">Sign in</Button>

				</div>
			</div>
		</div>
	);
}

