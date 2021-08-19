//ts-ignore is ignoring error "possibly undefined"

import React, { useRef, useState } from "react";
import { useStyles } from "./registerPageCss";
import { TextField, Card, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export function RegisterPage() {
	const css = useStyles();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [error, setError] = useState<string>("");
	const history = useHistory();

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");

		//not letting user continue to send to DB if the passwords do not match
		//@ts-ignore
		if (passwordRef.current.value.trim() !== passwordConfirmRef.current.value) {
			setError("Passwords do not match.");
			return;
		}

		//not letting user continue to send to DB if the password or email ref if there are just spaces filled out.
		//@ts-ignore
		if (emailRef.current.value.trim() === "" || passwordRef.current.value.trim() === "") {
			setError("Please fill out all fields");
			return;
		}

		try {
			await fetch("/api/createUser", {
				method: "POST",
				headers: { "content-type": "application/json" },
				//@ts-ignore
				body: JSON.stringify({ email: emailRef.current.value, password: passwordRef.current.value }),
			});
			history.push("/login");
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Card className={css.container}>
			<Typography variant="h2">Register</Typography>
			<Typography variant="body1">{error}</Typography>
			<form className={css.form} onSubmit={handleLogin}>
				<TextField required label="Email" type="email" inputRef={emailRef} />
				<TextField required label="Password" type="password" inputRef={passwordRef} />
				<TextField required label="Confirm Password" type="password" inputRef={passwordConfirmRef} />
				<Button type="submit">Register</Button>
			</form>
		</Card>
	);
}
