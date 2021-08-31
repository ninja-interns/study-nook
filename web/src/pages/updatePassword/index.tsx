import { Button, Card, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useGetState } from "../../utils/getState";
import { useStyles } from "../register/registerPageCss";

interface IData {
	isValid: boolean;
	message: string;
}

export function UpdatePassword() {
	useGetState();
	const css = useStyles();
	const currentPasswordRef = useRef<HTMLInputElement>();
	const newPasswordRef = useRef<HTMLInputElement>();
	const confirmationRef = useRef<HTMLInputElement>();
	const [error, setError] = useState<string>("");

	async function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");

		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch("/api/updatePassword", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					currentPassword: currentPasswordRef?.current?.value,
					newPassword: newPasswordRef?.current?.value,
					confirmation: confirmationRef?.current?.value,
				}),
			});
			//awaiting the response to comeback and turn it into readable json data
			const data: IData = await response.json();
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
			<Typography variant="h2">Change Password</Typography>
			<Typography variant="body1">{error}</Typography>
			<form className={css.form} onSubmit={handleUpdatePassword}>
				<TextField required label="Current Password" type="password" inputProps={{ minLength: 6 }} inputRef={currentPasswordRef} />
				<TextField required label="New Password" type="password" inputProps={{ minLength: 6 }} inputRef={newPasswordRef} />
				<TextField required label="Confirm New Password" type="password" inputProps={{ minLength: 6 }} inputRef={confirmationRef} />
				<Button type="submit">Update</Button>
			</form>
		</Card>
	);
}