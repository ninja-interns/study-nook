//ts-ignore is ignoring error "possibly undefined"

import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Color } from "@material-ui/lab/Alert";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Snackbars } from "./../../components/snackbar/index";
import { useStyles } from "./registerPageCss";

export function RegisterPage(): JSX.Element {
	const css = useStyles();
	const emailRef = useRef<HTMLInputElement>();
	const nameRef = useRef<HTMLInputElement>();
	const usernameRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();
	const passwordConfirmRef = useRef<HTMLInputElement>();
	const [message, setMessage] = useState<string>("");
	const [severity, setSeverity] = useState<Color | undefined>(undefined);
	const [isOpen, setIsOpen] = useState<boolean>(false);
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
			setSeverity("error");
			setIsOpen(true);
			return;
		}

		//not letting user continue to send to DB if the password or email ref if there are just spaces filled out.
		if (emailRef?.current?.value.trim() === "" || passwordRef?.current?.value.trim() === "") {
			setMessage("Please fill out all fields");
			setSeverity("error");
			setIsOpen(true);
			return;
		}

		try {
			setMessage("Loading...");
			setIsOpen(true);
			setSeverity("info");
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
				setSeverity("success");
				setIsOpen(true);
			} else {
				setMessage(data.message);
				setSeverity("error");
				setIsOpen(true);
			}
		} catch (err) {
			console.error(err);
		}
	}

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setIsOpen(false);
	};

	return (
		<Card className={css.container}>
			<Typography variant="h2">Register</Typography>
			<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
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
