import { Box, Button, Color, Fade, Slide, TextField, Typography } from "@mui/material"
import React, { useRef, useState } from "react"
import { Redirect, Route } from "react-router-dom"
import { useLastLocation } from "react-router-last-location"
import { Snackbars } from "../../components"
import { ContextContainer } from "../../contexts/ContextContainer"
import { useStyles } from "./loginPageCss"
import logo from "../../assets/logo.svg"

interface IData {
	isValid: boolean
	message: string
	isVerified: boolean
}

interface ITransitionProps {
	children: JSX.Element
}

function Transition({ children }: ITransitionProps): JSX.Element {
	const lastLocation: string | undefined = useLastLocation()?.pathname
	if (lastLocation === "/registration") {
		return (
			<Slide direction={"right"} in={true} timeout={1000}>
				{children}
			</Slide>
		)
	} else {
		return (
			<Fade in={true} timeout={1000}>
				{children}
			</Fade>
		)
	}
}

export function LoginPage() {
	const css = useStyles()
	const userRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()
	const [loading, setLoading] = useState<boolean>(false)
	const [message, setMessage] = useState<string>("")
	const [severity, setSeverity] = useState<Color | undefined>(undefined)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [redirect, setRedirect] = useState<string | null>(null)
	const { setIsLoggedIn } = ContextContainer.useContainer()

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setMessage("")
		setLoading(true)
		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch("http://localhost:8080/api/login_user", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ email: userRef?.current?.value, username: userRef?.current?.value, password: passwordRef?.current?.value }),
			})
			//awaiting the response to comeback and turn it into readable json data
			const data: IData = await response.json()
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
			if (data.isValid && data.isVerified) {
				setIsLoggedIn(true)
				setRedirect("/dashboard")
			} else {
				setMessage(data.message)
				setIsOpen(true)
				// setSeverity("error")
			}
		} catch (err) {
			console.error(err)
		}
		setLoading(false)
	}

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return
		}

		setIsOpen(false)
	}

	return (
		<Transition>
			<Box
				component="div"
				sx={{
					height: "100%",
					width: "100%",
					display: "flex",
					alignItems: "center",
				}}
			>
				<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
				<Box
					component="div"
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Typography variant="h4">StudyNook</Typography>
					<Box
						component="img"
						src={logo}
						sx={{
							height: 180,
							width: 180,
						}}
					></Box>
					{/* <Typography variant="h2">Login</Typography> */}
					{/* <Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} /> */}
					<Box
						component="form"
						onSubmit={handleLogin}
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							width: "100%",
							padding: "1rem",
						}}
					>
						<TextField fullWidth required label="Email or Username" type="text" inputRef={userRef} variant="standard" />
						<TextField fullWidth required label="Password" type="password" inputRef={passwordRef} variant="standard" />
						<Button
							variant="contained"
							color="primary"
							disabled={loading}
							type="submit"
							sx={{
								margin: "1rem",
								width: "75%",
							}}
						>
							Login
						</Button>
						<Typography variant="body1">
							Don't have an account?{" "}
							<Button onClick={() => setRedirect("/registration")} disabled={loading}>
								Register
							</Button>
						</Typography>
						<Typography variant="body1">
							Forgot your password?{" "}
							<Button onClick={() => setRedirect("/forgotPassword")} disabled={loading}>
								Recover
							</Button>
						</Typography>
					</Box>
				</Box>
			</Box>
		</Transition>
	)
}
