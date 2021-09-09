import React, { useRef } from "react";
import { useStyles } from "./loginPageCss";
import { TextField, Card, Button, Typography, Link } from "@material-ui/core";
import { useGetState } from "../../utils/getState";

export function LoginPage() {
	useGetState();
	const css = useStyles();
	const usernameRef = useRef();
	const passwordRef = useRef();

	function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		console.log("submit");
		e.preventDefault();
	}

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setIsOpen(false);
	};

	return (
		<Card className={css.container}>
			<Typography variant="h2">Login</Typography>
			<form className={css.form} onSubmit={handleLogin}>
				<TextField id="standard-basic" label="Username" inputRef={usernameRef} />
				<TextField id="standard-basic" label="Email" inputRef={passwordRef} />
				<Button type="submit">Login</Button>

			</form>
		</Card>
	);
}
function setIsOpen(arg0: boolean) {
	throw new Error("Function not implemented.");
}

