import React, { useRef, useState } from "react"
import { Fab } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useHistory, Route, Redirect } from "react-router-dom"
import { Color } from "@material-ui/lab"
import { Modal, Backdrop, Slide, Fade, Button, Typography, TextareaAutosize } from "@material-ui/core"

import { useStyles } from "./supportCss"
import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"
import { Snackbars } from "../../components"
import { getCurrentDate } from "./../../utils/getDate"

import closeButton from "../../assets/close-button.png"
import { DomainContainer } from "../../contexts/DomainContext"

interface IData {
	isValid: boolean
	message: string
}

export function SupportPage() {
	const css = useStyles()
	const history = useHistory()
	useGetState()
	const { currentUser } = ContextContainer.useContainer()
	const { url } = DomainContainer.useContainer()

	const [error, setError] = useState("")
	const [popup, setPopup] = useState(false)
	const [message, setMessage] = useState("")
	const [boxMessage, setBoxMessage] = useState<string>("")
	const [severity, setSeverity] = useState<Color | undefined>(undefined)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [redirect, setRedirect] = useState<string | null>(null)

	const messageRef = useRef<HTMLInputElement>()

	async function handleReportSubmit() {
		setError("")

		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch(`${url}/api/report_submission`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ username: currentUser.username, date: getCurrentDate(), message: message }),
			})
			//awaiting the response to comeback and turn it into readable json data
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
			const data: IData = await response.json()
			if (data.isValid) {
				console.log(data.message)
				setBoxMessage(data.message)
				setIsOpen(true)
				setSeverity("success")
			} else {
				setBoxMessage(data.message)
				setIsOpen(true)
				setSeverity("error")
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handlePopupOpen = () => {
		setPopup(true)
	}

	const handlePopupClose = () => {
		setPopup(false)
	}

	const handleMessage = (e: React.ChangeEvent<any>) => {
		setMessage(e.target.value)
	}

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return
		}

		setIsOpen(false)
		setRedirect("/menu")
	}

	const body = (
		<>
			<div className={css.popUpBody}>
				<Typography variant="h5" className={css.popUpTitle}>
					Confirmation
				</Typography>
				<Typography variant="h6" className={css.popUpContent}>
					Username: {currentUser.username}
				</Typography>
				<Typography variant="h6" className={css.popUpContent}>
					Date: {getCurrentDate()}
				</Typography>
				<Typography variant="h6" className={css.popUpContent}>
					Message: <br />
					{message}{" "}
				</Typography>

				<div className={css.buttonsClass}>
					<Button variant="contained" color="primary" onClick={handleReportSubmit}>
						{" "}
						Submit{" "}
					</Button>

					<Button variant="contained" color="primary" onClick={handlePopupClose}>
						{" "}
						Cancel{" "}
					</Button>
				</div>
			</div>
		</>
	)

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Slide in={true} direction={"left"} timeout={1000}>
				<div className={css.container}>
					<Fab size="medium" color="primary" onClick={() => history.goBack()} sx={{ position: "absolute", top: "0px", right: "0px", margin: "20px" }}>
						<CloseIcon fontSize="large" />
					</Fab>

					<Snackbars message={boxMessage} severity={severity} isOpen={isOpen} handleClose={handleClose} />

					<Typography className={css.pageTitle} variant="h5">
						Submit a ticket
					</Typography>

					<div>
						<Typography className={css.userInfo} variant="h5">
							Username: {currentUser.username}
						</Typography>
						<Typography className={css.userInfo} variant="h5">
							Message:
						</Typography>

						<TextareaAutosize required className={css.textArea} minRows={15} onKeyUp={handleMessage}></TextareaAutosize>
						<Button className={css.submitReportButton} variant="contained" color="primary" onClick={handlePopupOpen}>
							Submit
						</Button>

						<div>
							<Modal
								open={popup}
								onClose={handlePopupClose}
								aria-labelledby="Confirm"
								aria-describedby="Idk"
								BackdropComponent={Backdrop}
								BackdropProps={{
									timeout: 500,
								}}
							>
								<Fade in={popup}>{body}</Fade>
							</Modal>
						</div>
					</div>
				</div>
			</Slide>
		</>
	)
}
