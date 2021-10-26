import { Box, Button, TextField, Typography } from "@mui/material"
import { Color } from "@material-ui/lab/Alert"
import React, { useRef, useState } from "react"
import { useHistory } from "react-router"
import { DomainContainer } from "../../contexts/DomainContext"
import { useGetState } from "../../utils/getState"
import { Snackbars } from "./../../components/snackbar/index"
import { useStyles } from "./updatePasswordCss"

interface IData {
	isValid: boolean
	message: string
}

export function UpdatePassword() {
	useGetState()
	const css = useStyles()
	const history = useHistory()
	const { url } = DomainContainer.useContainer()
	const currentPasswordRef = useRef<HTMLInputElement>()
	const newPasswordRef = useRef<HTMLInputElement>()
	const confirmationRef = useRef<HTMLInputElement>()
	const [loading, setLoading] = useState<boolean>(false)
	const [message, setMessage] = useState<string>("")
	const [severity, setSeverity] = useState<Color | undefined>(undefined)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	async function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setMessage("")
		setLoading(true)

		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch(`${url}/api/update_password`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					currentPassword: currentPasswordRef?.current?.value,
					newPassword: newPasswordRef?.current?.value,
					confirmation: confirmationRef?.current?.value,
				}),
			})
			//awaiting the response to comeback and turn it into readable json data
			const data: IData = await response.json()

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
		<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: 600, width: 400 }}>
			<Typography variant="h4">Change Password</Typography>
			<Snackbars message={message} severity={severity} isOpen={isOpen} handleClose={handleClose} />
			<Box component="form" onSubmit={handleUpdatePassword} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
				<TextField
					variant="standard"
					required
					label="New Password"
					type="password"
					inputProps={{ minLength: 6 }}
					inputRef={newPasswordRef}
					sx={{ width: "75%" }}
				/>
				<TextField variant="standard" required label="Confirm New Password" type="password" inputRef={confirmationRef} sx={{ width: "75%" }} />
				<TextField
					variant="standard"
					fullWidth
					required
					label="Current Password"
					type="password"
					inputProps={{ minLength: 6 }}
					inputRef={currentPasswordRef}
					sx={{ width: "75%" }}
				/>
				<Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", mt: 2 }}>
					<Button variant="contained" type="submit" sx={{ m: 1, width: "40%" }}>
						Update
					</Button>
					<Button variant="contained" onClick={() => history.goBack()} sx={{ m: 1, width: "45%" }}>
						Back
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
