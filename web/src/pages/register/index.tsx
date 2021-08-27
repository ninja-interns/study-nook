//ts-ignore is ignoring error "possibly undefined"

import React, { useRef, useState } from "react";
import { useStyles } from "./registerPageCss";
import { TextField, Card, Button, Typography } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

export function RegisterPage() {
	const css = useStyles();
	const emailRef = useRef<HTMLInputElement>();
	const nameRef = useRef<HTMLInputElement>();
	const usernameRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();
	const passwordConfirmRef = useRef<HTMLInputElement>();
	const [message, setMessage] = useState<string>("");
	const history = useHistory();

	interface IData {
		isValid: boolean;
		message: string;
	}

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setMessage("");

		//not letting user continue to send to DB if the passwords do not match
		if (passwordRef?.current?.value.trim() !== passwordConfirmRef?.current?.value) {
			setMessage("Passwords do not match.");
			return;
		}

		//not letting user continue to send to DB if the password or email ref if there are just spaces filled out.
		if (emailRef?.current?.value.trim() === "" || passwordRef?.current?.value.trim() === "") {
			setMessage("Please fill out all fields");
			return;
		}

		try {
			setMessage("Loading...");
			const response = await fetch("/api/createUser", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					email: emailRef?.current?.value,
					password: passwordRef?.current?.value,
					username: usernameRef?.current?.value,
					name: nameRef?.current?.value,
				}),
			});

			//pushing to the page where they can verify their email
			const data: IData = await response.json();
			if (data.isValid) {
				history.push("/verifyEmail");
				setMessage(data.message);
			} else {
				setMessage(data.message);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Card className={css.container}>
			<Typography variant="h2">Register</Typography>
			<Typography variant="body1">{message}</Typography>
			<form className={css.form} onSubmit={handleLogin}>
				<TextField required label="Name" type="text" inputRef={nameRef} />
				<TextField required label="Username" type="text" inputRef={usernameRef} />
				<TextField required label="Email" type="email" inputRef={emailRef} />
				<TextField required label="Password" type="password" inputProps={{ minLength: 6 }} inputRef={passwordRef} />
				<TextField required label="Confirm Password" type="password" inputRef={passwordConfirmRef} />
				<Button type="submit">Register</Button>
				<Typography variant="body1">
					Already have an account? <Link to="/login">Log in here</Link>
				</Typography>
			</form>
		</Card>
	);
}
