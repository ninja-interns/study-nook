import { Player } from "@lottiefiles/react-lottie-player"
import { Color } from "@material-ui/lab/Alert"
import { Box, Button, TextField, Typography } from "@mui/material"
import React, { useRef, useState } from "react"
import { Redirect, Route } from "react-router-dom"
import { Snackbars } from "../../components"
import { ContextContainer } from "../../contexts/ContextContainer"
import { DomainContainer } from "../../contexts/DomainContext"

interface IData {
	isValid: boolean
	message: string
	isVerified: boolean
}

export function LoginPage() {
	const userRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()
	const [loading, setLoading] = useState<boolean>(false)
	const [message, setMessage] = useState<string>("")
	const [severity, setSeverity] = useState<Color | undefined>(undefined)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [redirect, setRedirect] = useState<string | null>(null)
	const { setIsLoggedIn } = ContextContainer.useContainer()
	const { url } = DomainContainer.useContainer()

	//* Animation Choices
	// const lottieJson = "https://assets9.lottiefiles.com/packages/lf20_cpeiwzvb.json"
	const lottieJson = "https://assets3.lottiefiles.com/private_files/lf30_lps8ojuw.json"
	// const lottieJson = "https://assets9.lottiefiles.com/packages/lf20_dv3etasb.json"
	// const lottieJson = "https://assets7.lottiefiles.com/private_files/lf30_vwwchm2i.json"
	// const lottieJson = "https://assets3.lottiefiles.com/packages/lf20_7smeegra.json"
	// const lottieJson = "https://assets9.lottiefiles.com/packages/lf20_3jmvq04g.json"
	// const lottieJson = "https://assets10.lottiefiles.com/packages/lf20_ynvlol6t.json"

	//* Handle Login Function
	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setMessage("")
		setLoading(true)
		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch(`${url}/api/login_user`, {
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
			} else if (data.message === "Please verify your email first.") {
				setRedirect("/verifyEmail")
			} else {
				setMessage(data.message)
				setIsOpen(true)
				setSeverity("error")
			}
		} catch (err) {
			console.error(err)
		}
		setLoading(false)
	}

	//* Snackbar MUI
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return
		}
		setIsOpen(false)
	}

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Player autoplay loop src={lottieJson} style={{ height: "250px", width: "400px" }}></Player>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
				<Typography fontFamily="Pacifico" fontSize="30" sx={{ pb: 2 }}>
					Study Nook
				</Typography>
				<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
				<Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<TextField variant="standard" fullWidth required label="Email or Username" type="text" inputRef={userRef} sx={{ width: 360, p: 1 }} />
					<TextField variant="standard" fullWidth required label="Password" type="password" inputRef={passwordRef} sx={{ width: 360, p: 1 }} />
					<Button variant="contained" disabled={loading} type="submit" sx={{ m: 1, width: "75%" }}>
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
		</>
	)
}
