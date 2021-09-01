import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { SimpleModal } from "./../modal";
import { Redirect, Route } from "react-router";

interface IData {
	isValid: boolean;
	message: string;
}

export function DeleteAccount() {
	const [redirect, setRedirect] = useState<string | null>(null);

	async function handleDeleteAccount() {
		try {
			const response = await fetch("/api/deleteAccount");
			const data: IData = await response.json();

			if (data.isValid) {
				setRedirect("/login");
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect to={redirect} /> : null)} />
			<SimpleModal buttonName="Delete Account" buttonVariant="outlined" buttonColor="secondary">
				<>
					<Typography>Are you sure you want to delete your account?</Typography>
					<Typography>
						<b>This action cannot be undone.</b>
					</Typography>
					<Button variant="contained" color="secondary" onClick={handleDeleteAccount}>
						Delete My Account
					</Button>
				</>
			</SimpleModal>
		</>
	);
}
