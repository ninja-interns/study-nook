import { Button, Card, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { AuthContainer } from "../../containers/AuthContainer";
import { useStyles } from "./updateUserCss";

interface IData {
	isValid: boolean;
	message: string;
}

export function UpdateUser() {
	const css = useStyles();
	const usernameRef = useRef<HTMLInputElement>();
	const emailRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();
	const [error, setError] = useState<string>("");
	const { currentUser } = AuthContainer.useContainer();

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError("");

		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch("/api/updateUser", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ email: emailRef?.current?.value, username: usernameRef?.current?.value, password: passwordRef?.current?.value }),
			});
			//awaiting the response to comeback and turn it into readable json data
			const data: IData = await response.json();
			console.log(data);
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
			<Typography variant="h2">Update Username or Email</Typography>
			<Typography variant="body1">{error}</Typography>
			<form className={css.form} onSubmit={handleLogin}>
				<TextField required label="Email" type="text" defaultValue={currentUser.email} inputRef={usernameRef} />
				<TextField required label="Username" type="text" defaultValue={currentUser.username} inputRef={emailRef} />
				<TextField required label="Password" type="password" inputRef={passwordRef} />
				<Button type="submit">Update</Button>
			</form>
		</Card>
	);
}
