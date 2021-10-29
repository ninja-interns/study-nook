// Inspired from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
// Thanks Sebastian Silbermann - https://github.com/eps1lon

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Alert from "@material-ui/lab/Alert"
import { makeStyles } from "@material-ui/core/styles"
import { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { ContextContainer } from "../contexts/ContextContainer"
import { login, IResponse } from "../api/admin"

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://studynook.xyz/">
				Study Nook
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const Login = () => {
	const { setIsLoggedIn } = ContextContainer.useContainer()
	const classes = useStyles()
	const emailRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()
	const [isError, setIsError] = useState(false)
	const [response, setResponse] = useState<IResponse>()

	let history = useHistory()

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		let email = emailRef?.current?.value
		let password = passwordRef?.current?.value
		if (email !== undefined && password !== undefined) {
			const r: IResponse = await login(email, password)
			if (r.status === 200) {
				setIsLoggedIn(true)
				history.push("/dashboard")
			} else {
				setResponse(r)
				setIsError(true)
			}
		} else {
			setIsError(true)
		}
	}

	return (
		<div>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Study Nook
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleLogin}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							inputRef={emailRef}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							inputRef={passwordRef}
						/>
						{isError && <Alert severity="error">{response?.text === undefined ? "Please fill out all fields" : response.text}</Alert>}

						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							Log In
						</Button>
					</form>
				</div>
				<Box mt={1}>
					<Copyright />
				</Box>
			</Container>
		</div>
	)
}

export { Login }
