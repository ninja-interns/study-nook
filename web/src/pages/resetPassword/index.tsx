import { Button, TextField, Typography } from "@material-ui/core"
import { Color } from "@material-ui/lab/Alert"
import React, { useRef, useState } from "react"
import { Redirect, Route } from "react-router"
import { Snackbars } from "../../components"
import { useStyles } from "./resetPasswordCss"

interface IData {
	isValid: boolean
	message: string
}

export function ResetPassword() {
	const css = useStyles()
	const emailRef = useRef<HTMLInputElement>()
	const tokenRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()
	const confirmationRef = useRef<HTMLInputElement>()
	const [message, setMessage] = useState<string>("")
	const [loading, setLoading] = useState<boolean>(false)
	const [severity, setSeverity] = useState<Color | undefined>(undefined)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [redirect, setRedirect] = useState<string | null>(null)

	async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setMessage("")
		setLoading(true)

		if (confirmationRef?.current?.value !== passwordRef?.current?.value) {
			setMessage("Your passwords do not match")
			setIsOpen(true)
			setSeverity("error")
			setLoading(false)
			return
		}

		try {
			const response = await fetch("http://localhost:8080/api/reset_password", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					email: emailRef?.current?.value,
					token: tokenRef?.current?.value,
					password: passwordRef?.current?.value,
					confirmation: confirmationRef?.current?.value,
				}),
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
		<div className={css.container}>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<div className={css.content}>
				<Typography>StudyNookLogo📚</Typography>
				<Typography variant="h2">Reset Password</Typography>
				<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
				<Typography variant="body1">Please enter the code sent to your email and enter a new password.</Typography>
				<form className={css.form} onSubmit={handleResetPassword}>
					<TextField fullWidth label="Code" type="text" inputRef={tokenRef} />
					<TextField fullWidth label="Email" type="email" inputRef={emailRef} />
					<TextField fullWidth label="New Password" type="password" inputProps={{ minLength: 6 }} inputRef={passwordRef} />
					<TextField fullWidth label="Confirm Password" type="password" inputRef={confirmationRef} />
					<Button variant="contained" color="primary" className={css.button} disabled={loading} type="submit">
						Submit
					</Button>
				</form>
			</div>
		</div>
	)
}
