import React, { useRef, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { SimpleModal } from "./../modal";
import { Redirect, Route } from "react-router";
import { Snackbars } from "..";
import { Color } from "@material-ui/lab/Alert";
import { useStyles } from "./deleteAccountCss";

interface IData {
	isValid: boolean;
	message: string;
}

export function DeleteAccount() {
	const css = useStyles();
	const [redirect, setRedirect] = useState<string | null>(null);
	const currentPasswordRef = useRef<HTMLInputElement>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [severity, setSeverity] = useState<Color | undefined>(undefined);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	async function handleDeleteAccount(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch("/api/delete_account", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ currentPassword: currentPasswordRef?.current?.value }),
			});
			const data: IData = await response.json();

			if (data.isValid) {
				setRedirect("/deletedAccount");
				setMessage(data.message);
				setIsOpen(true);
				setSeverity("success");
			} else {
				setMessage(data.message);
				setIsOpen(true);
				setSeverity("error");
			}
		} catch (err) {
			console.log(err);
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
			<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
			<SimpleModal buttonName="Delete Account" buttonVariant="outlined" buttonColor="secondary">
				<div className={css.container}>
					<Typography>Are you sure you want to delete your account?</Typography>
					<Typography>
						<b>This action cannot be undone.</b>
					</Typography>
					<form onSubmit={handleDeleteAccount}>
						<TextField fullWidth required label="Password" type="password" inputProps={{ minLength: 6 }} inputRef={currentPasswordRef} />
						<Button className={css.button} variant="contained" color="primary" disabled={loading} type="submit">
							Delete
						</Button>
					</form>
				</div>
			</SimpleModal>
		</>
	);
}
