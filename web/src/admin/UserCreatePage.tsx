import { makeStyles } from "@material-ui/core";
import { Alert, Button, CssBaseline, TextField, Grid, Typography, Container } from "@mui/material";
import { LeftBar } from "./LeftBar";
import { NavBar } from "./NavBar";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(10),
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
		margin: "1",
	},
	main: {
		width: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(0),
	},
}));

export interface IUser {
	[k: string]: string | boolean;
	id: string;
	username: string;
	name: string;
	email: string;
	isVerified: boolean;
	token: string;
}

export interface IErrorMessage {
	[k: string]: string | boolean;
	message: string;
	isValid: boolean;
}

// isErrorMessage checks if the response is IErrorMessage or not
const isIErrorMessage = (response: IUser | IErrorMessage | undefined): response is IErrorMessage => {
	if (response !== undefined) {
		return (response as IErrorMessage).message !== undefined;
	}
	return false;
};

const UserCreatePage = () => {
	const classes = useStyles();
	const history = useHistory();
	const [response, setResponse] = useState<IUser | IErrorMessage>();
	const [isError, setIsError] = useState(false);

	const usernameRef = useRef<HTMLInputElement>();
	const nameRef = useRef<HTMLInputElement>();
	const emailRef = useRef<HTMLInputElement>();
	const passwordRef = useRef<HTMLInputElement>();
	const confirmPasswordRef = useRef<HTMLInputElement>();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Hitting the API endpoint: POST /admin/users
		try {
			const res = await fetch("/admin/users", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					username: usernameRef?.current?.value,
					name: nameRef?.current?.value,
					email: emailRef?.current?.value,
					password: passwordRef?.current?.value,
					confirmPassword: confirmPasswordRef?.current?.value,
				}),
			});

			const data: IUser | IErrorMessage = await res.json();
			if (res.status === 200 && !isIErrorMessage(data)) {
				history.push("/admin-users")
			} else {
				setIsError(true);
				setResponse(data);
			}
		} catch (err) {
			setIsError(true);
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setIsError(false);
	};

	return (
		<div>
			<NavBar />
			<Grid container>
				<Grid item sm={2} xs={2}>
					<LeftBar />
				</Grid>
				<Grid item sm={10} xs={10}>
					<Container className={classes.container} style={{ height: 650, width: "100%" }}>
						<CssBaseline />
						<div className={classes.title}>
							<Typography variant="h6" color="primary" gutterBottom>
								CREATE USER
							</Typography>
							<Link to="/admin-users" style={{ textDecoration: "none" }}>
								<Button color="primary" variant="contained" size="medium">
									VIEW USERS
								</Button>
							</Link>
						</div>
						<div className={classes.main}>
							<form className={classes.form} noValidate onSubmit={handleSubmit}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="username"
											label="Username"
											name="username"
											autoComplete="username"
											inputRef={usernameRef}
											onChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="name"
											label="Name"
											name="name"
											autoComplete="name"
											inputRef={nameRef}
											onChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											id="email"
											label="Email Address"
											name="email"
											autoComplete="email"
											inputRef={emailRef}
											onChange={handleChange}
										/>
									</Grid>

									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											name="password"
											label="Password"
											type="password"
											id="password"
											autoComplete="password"
											inputRef={passwordRef}
											onChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant="outlined"
											required
											fullWidth
											name="confirmPassword"
											label="Confirm Password"
											type="password"
											id="confirmPassword"
											autoComplete="confirmPassword"
											inputRef={confirmPasswordRef}
											onChange={handleChange}
										/>
									</Grid>
									{isError && (
										<Grid item xs={12}>
											<Alert severity="error">{response?.message === undefined ? "Internal server error! Try again." : response.message}</Alert>
										</Grid>
									)}
									<Grid item xs={4} sm={4}>
										<Button name="submit" type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
											SUBMIT
										</Button>
									</Grid>
								</Grid>
							</form>
						</div>
					</Container>
				</Grid>
			</Grid>
		</div>
	);
};
export { UserCreatePage, isIErrorMessage };
