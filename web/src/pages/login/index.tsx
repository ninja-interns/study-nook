import React, { useRef, useState } from "react";
import { useStyles } from "./loginPageCss";
import { TextField, Card, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

interface DataI {
	isValid: boolean;
	message: string;
}

export function LoginPage() {
	const css = useStyles();
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState<string>("");

	const history = useHistory();

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("/api/loginUser", {
				method: "POST",
				headers: { "content-type": "application/json" },
				//@ts-ignore
				body: JSON.stringify({ email: emailRef.current.value, password: passwordRef.current.value }),
			});
			const data: DataI = await response.json();
			console.log(data);
			if (data.isValid) {
				history.push("/dashboard");
			} else {
				setError(data.message);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Card className={css.container}>
			<Typography variant="h2">Login</Typography>
			<Typography variant="body1">{error}</Typography>
			<form className={css.form} onSubmit={handleLogin}>
				<TextField required label="Email" type="email" inputRef={emailRef} />
				<TextField required label="Password" type="password" inputRef={passwordRef} />
				<Button type="submit">Login</Button>
			</form>
		</Card>
	);
}
