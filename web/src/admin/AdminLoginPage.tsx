// Inspired from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
// Thanks Sebastian Silbermann - https://github.com/eps1lon

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useRef } from "react"
import { useHistory } from "react-router-dom"

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://studynook.com/">
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

const AdminLoginPage = () => {
	const classes = useStyles()
	const emailRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()

	let history = useHistory()

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		// Hitting the backend with POST request
		try {
			//Fake API endpoint, responds JWT
			// const response = await fetch("https://mocki.io/v1/551c5c52-83a6-4420-934f-cfd7c67c37f8", {
			// 	method: "POST",
			// 	headers: { "content-type": "application/json" },
			// 	body: JSON.stringify({ email: emailRef?.current?.value, password: passwordRef?.current?.value }),
			// })
			// Awaiting the JWT
			const response = await fetch("https://mocki.io/v1/551c5c52-83a6-4420-934f-cfd7c67c37f8") //Fake REST API, gives the exact JSON, will be replaced with original one
			const { data } = await response.json()
			console.log(data)
			localStorage.setItem("token", data)
			history.push("/admin/dashboard")
		} catch (err) {
			console.error(err)
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
						<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							Sign In
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

export default AdminLoginPage
