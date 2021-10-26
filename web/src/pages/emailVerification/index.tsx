import { Box, Button, TextField, Typography } from "@mui/material"
import { Color } from "@material-ui/lab/Alert"
import React, { useRef, useState } from "react"
import { Redirect, Route } from "react-router-dom"
import { Snackbars } from "../../components"
import { DomainContainer } from "../../contexts/DomainContext"
import { useStyles } from "./emailVerificationCss"
import { Player } from "@lottiefiles/react-lottie-player"
import lottieJson from "../../animation/71439-girl-working-on-computer.json"

interface IData {
	isValid: boolean
	message: string
}

export function EmailVerificationPage() {
	const { url } = DomainContainer.useContainer()
	const css = useStyles()
	const verificationRef = useRef<HTMLInputElement>()
	const [message, setMessage] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(false)
	const [severity, setSeverity] = useState<Color | undefined>(undefined)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [redirect, setRedirect] = useState<string | null>(null)

	async function handleVerification(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setMessage("")
		setLoading(true)

		try {
			setMessage("Loading...")
			setIsOpen(true)
			setSeverity("info")
			const response = await fetch(`${url}/api/verify_email/${verificationRef?.current?.value}`, {
				method: "GET",
			})
			const data: IData = await response.json()

			if (data.isValid) {
				setRedirect("/login")
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
			<Box component="div" className={css.container}>
				<Typography fontFamily="Pacifico" fontSize="30" sx={{ mb: 6 }}>
					Email Verification
				</Typography>
				<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
				<Typography variant="subtitle1">Please enter the code you were sent.</Typography>
				<Box component="form" className={css.form} onSubmit={handleVerification}>
					<TextField variant="standard" required label="Verification Code" inputRef={verificationRef} />
					<Button variant="contained" disabled={loading} type="submit" sx={{ mt: 2 }}>
						Verify Email
					</Button>
				</Box>
			</Box>
		</>
	)
}
