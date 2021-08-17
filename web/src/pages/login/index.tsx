import React, { useRef } from "react";
import { useStyles } from "./loginPageCss";
import { TextField, Card, Button, Typography } from "@material-ui/core";

export function LoginPage() {
	const css = useStyles();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const idRef = useRef();

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		console.log("submit");
		e.preventDefault();

		try {
			await fetch("/api/createUser", {
				method: "POST",
				headers: { "content-type": "application/json" },
				//@ts-ignore
				body: JSON.stringify({ id: idRef.current.value, username: usernameRef.current.value, password: passwordRef.current.value }),
			});
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Card className={css.container}>
			<Typography variant="h2">Login</Typography>
			<form className={css.form} onSubmit={handleLogin}>
				<TextField label="id" inputRef={idRef} />
				<TextField id="standard-basic" label="Username" inputRef={usernameRef} />
				<TextField id="standard-basic" label="Password" type="password" inputRef={passwordRef} />
				<Button type="submit">Login</Button>
			</form>
		</Card>
	);
}
