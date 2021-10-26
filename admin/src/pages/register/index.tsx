//ts-ignore is ignoring error "possibly undefined"
import { Player } from "@lottiefiles/react-lottie-player"
import { Color } from "@material-ui/lab/Alert"
import { Box, Button, TextField, Typography } from "@mui/material"
import React, { useRef, useState } from "react"
import { Redirect, Route } from "react-router-dom"
import lottieJson from "../../animation/71439-girl-working-on-computer.json"
import { DomainContainer } from "../../contexts/DomainContext"
import { Snackbars } from "./../../components/snackbar/index"
import { useStyles } from "./registerPageCss"

export function RegisterPage(): JSX.Element {
	const css = useStyles()
	const emailRef = useRef<HTMLInputElement>()
	const nameRef = useRef<HTMLInputElement>()
	const usernameRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()
	const passwordConfirmRef = useRef<HTMLInputElement>()
	const [loading, setLoading] = useState<boolean>(false)
	const [message, setMessage] = useState<string>("")
	const [severity, setSeverity] = useState<Color | undefined>(undefined)
	const [redirect, setRedirect] = useState<string | null>(null)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { url } = DomainContainer.useContainer()

	interface IData {
		isValid: boolean
		message: string
	}

	async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setMessage("")
		setLoading(true)

		//not letting user continue to send to DB if the passwords do not match
		if (passwordRef?.current?.value.trim() !== passwordConfirmRef?.current?.value) {
			setMessage("Passwords do not match.")
			setSeverity("error")
			setIsOpen(true)
			setLoading(false)
			return
		}

		//not letting user continue to send to DB if the password or email ref if there are just spaces filled out.
		if (emailRef?.current?.value.trim() === "" || passwordRef?.current?.value.trim() === "") {
			setMessage("Please fill out all fields")
			setSeverity("error")
			setIsOpen(true)
			setLoading(false)
			return
		}

		try {
			setMessage("Loading...")
			setIsOpen(true)
			setSeverity("info")
			const response = await fetch(`${url}/api/create_user`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					email: emailRef?.current?.value,
					password: passwordRef?.current?.value,
					username: usernameRef?.current?.value,
					name: nameRef?.current?.value,
				}),
			})

			//pushing to the page where they can verify their email
			const data: IData = await response.json()
			if (data.isValid) {
				setRedirect("/verifyEmail")
				setMessage(data.message)
				setSeverity("success")
				setIsOpen(true)
			} else {
				setMessage(data.message)
				setSeverity("error")
				setIsOpen(true)
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
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Player autoplay loop src={lottieJson} style={{ height: "150px", width: "400px" }}></Player>
			<Box component="div" sx={{ display: "flex", alignItems: "center" }}>
				<Box component="div" className={css.content}>
					<Typography fontFamily="Pacifico" fontSize="30">
						Register
					</Typography>
					<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
					<Box component="form" className={css.form} onSubmit={handleRegister}>
						<TextField fullWidth required label="Username" type="text" variant="standard" inputRef={usernameRef} />
						<TextField fullWidth required label="Name" type="text" variant="standard" inputRef={nameRef} />
						<TextField fullWidth required label="Email" type="email" variant="standard" inputRef={emailRef} />
						<TextField
							fullWidth
							required
							label="Password"
							type="password"
							variant="standard"
							inputProps={{ minLength: 6 }}
							inputRef={passwordRef}
						/>
						<TextField fullWidth required label="Confirm Password" type="password" variant="standard" inputRef={passwordConfirmRef} />
						<Button className={css.button} variant="contained" color="primary" disabled={loading} type="submit">
							Register
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
