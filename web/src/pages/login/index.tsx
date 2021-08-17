import React, { useRef } from "react";
import { useStyles } from "./loginPageCss";
import { TextField, Card, Button, Typography } from "@material-ui/core";

export function LoginPage() {
	const css = useStyles();
	const usernameRef = useRef();
	const passwordRef = useRef();

	function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		console.log("submit");
		e.preventDefault();
	}

	return (
		<Card className={css.container}>
			<Typography variant="h2">Login</Typography>
			<form className={css.form} onSubmit={handleLogin}>
				<TextField id="standard-basic" label="Username" inputRef={usernameRef} />
				<TextField id="standard-basic" label="Email" inputRef={passwordRef} />
				<Button type="submit">Login</Button>
			</form>
		</Card>
	);
}
