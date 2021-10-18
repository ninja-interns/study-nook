//ts-ignore is ignoring error "possibly undefined"

import { Button, Fade, Slide, TextField, Typography } from "@material-ui/core"
import { Color } from "@material-ui/lab/Alert"
import React, { useRef, useState } from "react"
import { Redirect, Route } from "react-router-dom"
import { useLastLocation } from "react-router-last-location"
import { Snackbars } from "./../../components/snackbar/index"
import { useStyles } from "./registerPageCss"

interface ITransitionProps {
	children: JSX.Element
}

function Transition({ children }: ITransitionProps): JSX.Element {
	const lastLocation: string | undefined = useLastLocation()?.pathname
	if (lastLocation === "/login") {
		return (
			<Slide direction={"left"} in={true} timeout={1000}>
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
			const response = await fetch("http://localhost:8080/api/create_user", {
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
		<Transition>
			<div className={css.container}>
				<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
				<div className={css.content}>
					<Typography>StudyNookLogo📚</Typography>
					<Typography variant="h2">Register</Typography>
					<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
					<form className={css.form} onSubmit={handleRegister}>
						<TextField fullWidth required label="Username" type="text" inputRef={usernameRef} />
						<TextField fullWidth required label="Name" type="text" inputRef={nameRef} />
						<TextField fullWidth required label="Email" type="email" inputRef={emailRef} />
						<TextField fullWidth required label="Password" type="password" inputProps={{ minLength: 6 }} inputRef={passwordRef} />
						<TextField fullWidth required label="Confirm Password" type="password" inputRef={passwordConfirmRef} />
						<Button className={css.button} variant="contained" color="primary" disabled={loading} type="submit">
							Register
						</Button>
						<Typography variant="body1">
							Already have an account?{" "}
							<Button onClick={() => setRedirect("/login")} disabled={loading}>
								Log in
							</Button>
						</Typography>
					</form>
				</div>
			</div>
		</Transition>
	)
}
