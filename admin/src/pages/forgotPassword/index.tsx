import { Box, Button, TextField, Typography } from "@mui/material"
import { Color } from "@material-ui/lab/Alert"
import React, { useRef, useState } from "react"
import { Redirect, Route } from "react-router"
import { Snackbars } from "../../components"
import { DomainContainer } from "../../contexts/DomainContext"
import { useStyles } from "./forgotPasswordCss"
import { Player } from "@lottiefiles/react-lottie-player"
import lottieJson from "../../animation/71439-girl-working-on-computer.json"

interface IData {
	isValid: boolean
	message: string
}

export function ForgotPassword() {
	const { url } = DomainContainer.useContainer()
	const css = useStyles()
	const emailRef = useRef<HTMLInputElement>()
	const [message, setMessage] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(false)
	const [severity, setSeverity] = useState<Color | undefined>(undefined)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [redirect, setRedirect] = useState<string | null>(null)

	async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setMessage("Loading...")
		setIsOpen(true)
		setSeverity("info")
		setLoading(true)

		try {
			const response = await fetch(`${url}/api/forgot_password`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ email: emailRef?.current?.value }),
			})
			const data: IData = await response.json()

			if (data.isValid) {
				setRedirect("/resetPassword")
				return
			}

			setMessage(data.message)
			setIsOpen(true)
			setSeverity("error")
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
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Player autoplay loop src={lottieJson} style={{ height: "250px", width: "400px" }}></Player>
			<Box component="div" sx={{ display: "flex", alignItems: "center" }}>
				<Box component="div" className={css.content}>
					<Typography fontFamily="Pacifico" fontSize="30" sx={{ pb: 2 }}>
						Recover Password
					</Typography>
					<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
					<Typography variant="body1">Please enter your email you used to sign up with StudyNook</Typography>
					<Box component="form" className={css.form} onSubmit={handleForgotPassword}>
						<TextField variant="standard" fullWidth label="Email" type="email" inputRef={emailRef} />
						<Button variant="contained" color="primary" className={css.button} disabled={loading} type="submit">
							Submit
						</Button>
						<Typography variant="body1">
							Already have an account?{" "}
							<Button onClick={() => setRedirect("/login")} disabled={loading}>
								Log in
							</Button>
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	)
}
