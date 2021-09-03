import React, { useRef, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { SimpleModal } from "./../modal";
import { Redirect, Route } from "react-router";
import { Snackbars } from "..";
import { Color } from "@material-ui/lab/Alert";

interface IData {
	isValid: boolean;
	message: string;
}

export function DeleteAccount() {
	const [redirect, setRedirect] = useState<string | null>(null);
	const currentPasswordRef = useRef<HTMLInputElement>();
	const [message, setMessage] = useState<string>("");
	const [severity, setSeverity] = useState<Color | undefined>(undefined);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	async function handleDeleteAccount(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();
		try {
			const response = await fetch("/api/deleteAccount", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ currentPassword: currentPasswordRef?.current?.value }),
			});
			const data: IData = await response.json();
			console.log(data);
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
				<>
					<Typography>Are you sure you want to delete your account?</Typography>
					<Typography>
						<b>This action cannot be undone.</b>
					</Typography>
					<form onSubmit={handleDeleteAccount}>
						<Typography>Please enter your password to continue.</Typography>
						<TextField required label="Password" type="password" inputRef={currentPasswordRef} />
						<Button type="submit" variant="contained" color="secondary">
							Delete My Account
						</Button>
					</form>
				</>
			</SimpleModal>
		</>
	);
}
