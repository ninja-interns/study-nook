import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Color } from "@material-ui/lab/Alert";
import React, { useRef, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { Snackbars } from "../../components";
import { AuthContainer } from "../../containers/AuthContainer";
import { useStyles } from "./loginPageCss";

interface IData {
	isValid: boolean;
	message: string;
	isVerified: boolean;
}

export function LoginPage() {
	const css = useStyles();
	const userRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [severity, setSeverity] = useState<Color | undefined>(undefined);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [redirect, setRedirect] = useState<string | null>(null);
	const { isLoggedIn, setIsLoggedIn } = AuthContainer.useContainer();

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setMessage("");
		setLoading(true);
		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch("/api/loginUser", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ email: userRef?.current?.value, username: userRef?.current?.value, password: passwordRef?.current?.value }),
			});
			//awaiting the response to comeback and turn it into readable json data
			const data: IData = await response.json();
			console.log(data, "isLoggedIn", isLoggedIn);
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
			if (data.isValid && data.isVerified) {
				setIsLoggedIn(true);
				setRedirect("/dashboard");
				console.log(redirect);
			} else {
				setMessage(data.message);
				setIsOpen(true);
				setSeverity("error");
			}
		} catch (err) {
			console.error(err);
		}
		setLoading(false);
	}

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setIsOpen(false);
	};

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Card className={css.container}>
				<Typography variant="h2">Login</Typography>
				<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
				<form className={css.form} onSubmit={handleLogin}>
					<TextField required label="Email or Username" type="text" inputRef={userRef} />
					<TextField required label="Password" type="password" inputRef={passwordRef} />
					<Button disabled={loading} type="submit">
						Login
					</Button>
					<Typography variant="body1">
						Don't have an account? <Button disabled={loading}>Log in here</Button>
					</Typography>
				</form>
			</Card>
		</>
	);
}
