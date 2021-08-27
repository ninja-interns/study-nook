import React, { useRef, useState } from "react";
import { useStyles } from "./loginPageCss";
import { TextField, Card, Button, Typography } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { AuthContainer } from "../../containers/AuthContainer";

interface IData {
	isValid: boolean;
	message: string;
	isVerified: boolean;
}

export function LoginPage() {
	const css = useStyles();
	const userRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();
	const [error, setError] = useState<string>("");
	const history = useHistory();
	const { isLoggedIn, setIsLoggedIn } = AuthContainer.useContainer();

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
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
			console.log(data, "isLoggedIn", isLoggedIn);
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
			if (data.isValid && data.isVerified) {
				setIsLoggedIn(true);
				history.push("/dashboard");
			} else {
				setError(data.message);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Card className={css.container}>
			<Typography variant="h2">Login</Typography>
			<Typography variant="body1">{error}</Typography>
			<form className={css.form} onSubmit={handleLogin}>
				<TextField required label="Email or Username" type="text" inputRef={userRef} />
				<TextField required label="Password" type="password" inputRef={passwordRef} />
				<Button type="submit">Login</Button>
				<Typography variant="body1">
					Don't have an account? <Link to="/registration">Register here</Link>
				</Typography>
			</form>
		</Card>
	);
}
