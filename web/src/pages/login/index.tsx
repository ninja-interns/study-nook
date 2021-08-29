import React, { useRef } from "react";
import { useStyles } from "./loginPageCss";
import { TextField, Card, Button, Typography } from "@material-ui/core";
<<<<<<< HEAD
=======
import { useHistory, Link } from "react-router-dom";

interface IData {
	isValid: boolean;
	message: string;
}
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048

export function LoginPage() {
	const css = useStyles();
	const usernameRef = useRef();
	const passwordRef = useRef();

	function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		console.log("submit");
		e.preventDefault();
<<<<<<< HEAD
=======
		setError("");

		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch("/api/loginUser", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ email: userRef?.current?.value, username: userRef?.current?.value, password: passwordRef?.current?.value }),
			});
			//awaiting the response to comeback and turn it into readable json data
			const data: IData = await response.json();
			console.log(data);
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back

			if (data.isValid) {
				history.push("/dashboard");
			} else {
				setError(data.message);
			}
		} catch (err) {
			console.log(err);
		}
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048
	}

	return (
		<Card className={css.container}>
			<Typography variant="h2">Login</Typography>
			<form className={css.form} onSubmit={handleLogin}>
				<TextField id="standard-basic" label="Username" inputRef={usernameRef} />
				<TextField id="standard-basic" label="Email" inputRef={passwordRef} />
				<Button type="submit">Login</Button>
				<Typography variant="body1">
					Don't have an account? <Link to="/registration">Register here</Link>
				</Typography>
			</form>
		</Card>
	);
}
