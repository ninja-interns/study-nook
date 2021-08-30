import { Card, Typography, TextField, Button } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./updateUserCss";

interface IData {
	isValid: boolean;
	message: string;
}

export function UpdateUser() {
	const css = useStyles();
	const usernameRef = useRef<HTMLInputElement>();
	const emailRef = useRef<HTMLInputElement>();
	const [error, setError] = useState<string>("");

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");

		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch("/api/updateUser", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ email: emailRef?.current?.value, username: usernameRef?.current?.value }),
			});
			//awaiting the response to comeback and turn it into readable json data
			const data: IData = await response.json();
			console.log(data);
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back

			if (data.isValid) {
				console.log("success! I'll fix this later:)");
			} else {
				setError(data.message);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Card className={css.container}>
			<Typography variant="h2">Update Username or Email</Typography>
			<Typography variant="body1">{error}</Typography>
			<form className={css.form} onSubmit={handleLogin}>
				<TextField required label="Email or Username" type="text" inputRef={usernameRef} />
				<TextField required label="Password" type="password" inputRef={emailRef} />
				<Button type="submit">Login</Button>
				<Typography variant="body1">
					Don't have an account? <Link to="/registration">Register here</Link>
				</Typography>
			</form>
		</Card>
	);
}
