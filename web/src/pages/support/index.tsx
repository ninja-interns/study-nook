import { Color } from "@material-ui/lab"
import CloseIcon from "@mui/icons-material/Close"
import { Backdrop, Box, Button, Fab, Fade, Modal, Slide, TextareaAutosize, Typography } from "@mui/material"
import React, { useRef, useState } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import { Snackbars } from "../../components"
import { ContextContainer } from "../../contexts/ContextContainer"
import { DomainContainer } from "../../contexts/DomainContext"
import { getCurrentDate } from "./../../utils/getDate"
import { useGetState } from "./../../utils/getState"
import { useStyles } from "./supportCss"

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

	function Body() {
		return (
			<>
				<Box component="div" className={css.popUpBody}>
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

					<Box component="div" className={css.buttonsClass}>
						<Button variant="contained" color="primary" onClick={handleReportSubmit}>
							{" "}
							Submit{" "}
						</Button>

						<Button variant="contained" color="primary" onClick={handlePopupClose}>
							{" "}
							Cancel{" "}
						</Button>
					</Box>
				</Box>
			</>
		)
	}

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Slide in={true} direction={"left"} timeout={1000}>
				<Box component="div" className={css.container}>
					<Fab size="medium" color="primary" onClick={() => history.goBack()} sx={{ position: "absolute", top: "0px", right: "0px", margin: "20px" }}>
						<CloseIcon fontSize="large" />
					</Fab>

					<Snackbars message={boxMessage} severity={severity} isOpen={isOpen} handleClose={handleClose} />

					<Typography fontSize="30px" variant="h5" sx={{ m: "20px" }}>
						Submit a ticket
					</Typography>

					<Box component="div">
						<Typography variant="h5" sx={{ margin: "20px", marginTop: "40px" }}>
							Username: {currentUser.username}
						</Typography>
						<Typography variant="h5" sx={{ margin: "20px", marginTop: "40px" }}>
							Message:
						</Typography>

						<TextareaAutosize
							required
							minRows={15}
							onKeyUp={handleMessage}
							style={{
								marginLeft: "20px",
								width: "360px",
								padding: "10px",
								borderRadius: "5%",
								border: "rgb(136 136 255)",
								boxShadow: "rgb(136 136 255) 0px 0px 0px 2px inset, rgb(136 136 255) 4px 4px 0px 0px, rgb(136 136 255) 4px 4px",
							}}
						/>

						<Box component="div">
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
								<Body />
							</Modal>
						</Box>
					</Box>
					<Button
						variant="contained"
						color="primary"
						onClick={handlePopupOpen}
						sx={{ margin: "0 auto", marginTop: "40px", alignSelf: "center", width: "50%" }}
					>
						Submit
					</Button>
				</Box>
			</Slide>
		</>
	)
}
