import { Color } from "@material-ui/lab/Alert"
import { Box, Button, TextField, Typography } from "@mui/material"
import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { ContextContainer } from "../../contexts/ContextContainer"
import { DomainContainer } from "../../contexts/DomainContext"
import { Snackbars } from "./../../components/snackbar/index"
import { useGetState } from "./../../utils/getState"
import { useStyles } from "./updateUserCss"

interface IData {
	isValid: boolean
	message: string
}

export function UpdateUser() {
	useGetState()
	const css = useStyles()
	const history = useHistory()
	const usernameRef = useRef<HTMLInputElement>()
	const nameRef = useRef<HTMLInputElement>()
	const emailRef = useRef<HTMLInputElement>()
	const passwordRef = useRef<HTMLInputElement>()
	const [loading, setLoading] = useState<boolean>(false)
	const [message, setMessage] = useState<string>("")
	const [severity, setSeverity] = useState<Color | undefined>(undefined)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { currentUser } = ContextContainer.useContainer()
	const { url } = DomainContainer.useContainer()

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setMessage("")
		setLoading(true)

		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch(`${url}/api/update_user`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					username: usernameRef?.current?.value,
					name: nameRef?.current?.value,
					email: emailRef?.current?.value,
					password: passwordRef?.current?.value,
				}),
			})
			//awaiting the response to comeback and turn it into readable json data
			const data: IData = await response.json()
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back

			if (data.isValid) {
				setMessage(data.message)
				setIsOpen(true)
				setSeverity("success")
			} else {
				setMessage(data.message)
				setIsOpen(true)
				setSeverity("error")
			}
		} catch (err) {
			console.log(err)
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
		// <Box component="div" className={css.container}>
		<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: 600, width: 400 }}>
			<Typography variant="h2">Update Profile</Typography>
			<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
			<Box component="form" className={css.form} onSubmit={handleLogin}>
				<TextField variant="standard" fullWidth required label="Name" type="text" defaultValue={currentUser.name} inputRef={nameRef} sx={{ mb: 2 }} />
				<TextField
					variant="standard"
					fullWidth
					required
					disabled
					label="Email"
					type="text"
					defaultValue={currentUser.email}
					inputRef={emailRef}
					sx={{ mb: 2 }}
				/>
				<TextField
					variant="standard"
					fullWidth
					required
					label="Username"
					type="text"
					defaultValue={currentUser.username}
					inputRef={usernameRef}
					sx={{ mb: 2 }}
				/>
				<Typography variant="body1">Please enter your password to confirm these changes</Typography>
				<TextField variant="standard" fullWidth required label="Password" type="password" inputRef={passwordRef} sx={{ mb: 2 }} />
				<Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", mt: 2 }}>
					<Button className={css.button} variant="contained" color="primary" disabled={loading} type="submit">
						Update
					</Button>
					<Button className={css.button} disabled={loading} variant="contained" color="primary" onClick={() => history.goBack()}>
						Back
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
