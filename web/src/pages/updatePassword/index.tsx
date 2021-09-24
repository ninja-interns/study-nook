import { Button, TextField, Typography } from "@material-ui/core";
import { Color } from "@material-ui/lab/Alert";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { useGetState } from "../../utils/getState";
import { Snackbars } from "./../../components/snackbar/index";
import { useStyles } from "./updatePasswordCss";

interface IData {
	isValid: boolean;
	message: string;
}

export function UpdatePassword() {
	useGetState();
	const css = useStyles();
	const history = useHistory();
	const currentPasswordRef = useRef<HTMLInputElement>();
	const newPasswordRef = useRef<HTMLInputElement>();
	const confirmationRef = useRef<HTMLInputElement>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [severity, setSeverity] = useState<Color | undefined>(undefined);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	async function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setMessage("");
		setLoading(true);

		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch("/api/update_password", {
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

			if (data.isValid) {
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
		<div className={css.container}>
			<div className={css.content}>
				<Typography variant="h2">Change Password</Typography>
				<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
				<form className={css.form} onSubmit={handleUpdatePassword}>
					<TextField fullWidth required label="Current Password" type="password" inputProps={{ minLength: 6 }} inputRef={currentPasswordRef} />
					<TextField fullWidth required label="New Password" type="password" inputProps={{ minLength: 6 }} inputRef={newPasswordRef} />
					<TextField fullWidth required label="Confirm New Password" type="password" inputRef={confirmationRef} />
					<div className={css.buttonContainer}>
						<Button className={css.button} variant="contained" color="primary" disabled={loading} type="submit">
							Update
						</Button>
						<Button className={css.button} disabled={loading} variant="outlined" color="primary" onClick={() => history.goBack()}>
							Back
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
