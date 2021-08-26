import { Button, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useStyles } from "./emailVerificationCss";
import { useHistory } from "react-router-dom";

interface IData {
	isValid: boolean;
	message: string;
}

export function EmailVerificationPage() {
	const css = useStyles();
	const verificationRef = useRef<HTMLInputElement>();
	const [message, setMessage] = useState<string>("");
	const history = useHistory();

	async function handleVerification(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setMessage("");

		try {
			setMessage("Loading...");
			const response = await fetch(`/api/verifyEmail/${verificationRef?.current?.value}`, {
				method: "GET",
			});
			const data: IData = await response.json();
			setMessage(data.message);
			if (data.isValid) {
				history.push("/login");
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className={css.container}>
			<Typography variant="h2">Email Verification</Typography>
			<Typography variant="body1">{message}</Typography>
			<Typography variant="subtitle1">Please enter the code you were sent.</Typography>
			<form className={css.form} onSubmit={handleVerification}>
				<TextField required label="Verification Code" inputRef={verificationRef} />
				<Button type="submit">Verify Email</Button>
			</form>
		</div>
	);
}
