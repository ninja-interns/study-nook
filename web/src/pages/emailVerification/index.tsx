import { Button, TextField, Typography } from "@material-ui/core";
import { Color } from "@material-ui/lab/Alert";
import React, { useRef, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { Snackbars } from "../../components";
import { useStyles } from "./emailVerificationCss";

interface IData {
	isValid: boolean;
	message: string;
}

export function EmailVerificationPage() {
	const css = useStyles();
	const verificationRef = useRef<HTMLInputElement>();
	const [message, setMessage] = useState<string>("");
	const [severity, setSeverity] = useState<Color | undefined>(undefined);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [redirect, setRedirect] = useState<string | null>(null);

	async function handleVerification(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setMessage("");

		try {
			setMessage("Loading...");
			setIsOpen(true);
			setSeverity("info");
			const response = await fetch(`/api/verifyEmail/${verificationRef?.current?.value}`, {
				method: "GET",
			});
			const data: IData = await response.json();

			if (data.isValid) {
				setRedirect("/login");
				return;
			}

			setMessage(data.message);
			setIsOpen(true);
			setSeverity("error");
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
		<div className={css.container}>
			<Route render={() => (redirect !== null ? <Redirect to={redirect} /> : null)} />
			<Typography variant="h2">Email Verification</Typography>
			<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
			<Typography variant="subtitle1">Please enter the code you were sent.</Typography>
			<form className={css.form} onSubmit={handleVerification}>
				<TextField required label="Verification Code" inputRef={verificationRef} />
				<Button type="submit">Verify Email</Button>
			</form>
		</div>
	);
}