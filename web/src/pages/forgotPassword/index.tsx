import { Button, TextField, Typography } from "@material-ui/core";
import { Color } from "@material-ui/lab/Alert";
import React, { useRef, useState } from "react";
import { Redirect, Route } from "react-router";
import { Snackbars } from "../../components";
import { useStyles } from "./forgotPasswordCss";

interface IData {
	isValid: boolean;
	message: string;
}

export function ForgotPassword() {
	const css = useStyles();
	const emailRef = useRef<HTMLInputElement>();
	const [message, setMessage] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [severity, setSeverity] = useState<Color | undefined>(undefined);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [redirect, setRedirect] = useState<string | null>(null);

	async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setMessage("Loading...");
		setIsOpen(true);
		setSeverity("info");
		setLoading(true);

		try {
			const response = await fetch("/api/forgot_password", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ email: emailRef?.current?.value }),
			});
			const data: IData = await response.json();

			if (data.isValid) {
				setRedirect("/resetPassword");
				return;
			}

			setMessage(data.message);
			setIsOpen(true);
			setSeverity("error");
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
		<div className={css.container}>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<div className={css.content}>
				<Typography>StudyNookLogo📚</Typography>
				<Typography variant="h2">Recover Password</Typography>
				<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
				<Typography variant="body1">Please enter your email you used to sign up with StudyNook</Typography>
				<form className={css.form} onSubmit={handleForgotPassword}>
					<TextField fullWidth label="Email" type="email" inputRef={emailRef} />
					<Button variant="contained" color="primary" className={css.button} disabled={loading} type="submit">
						Submit
					</Button>
					<Typography variant="body1">
						Already have an account?{" "}
						<Button onClick={() => setRedirect("/login")} disabled={loading}>
							Log in
						</Button>
					</Typography>
				</form>
			</div>
		</div>
	);
}
