import { Box, Button, Typography } from "@mui/material"
import { useHistory } from "react-router-dom"
import { useStyles } from "./deletedAccountPageCss"
import { Player } from "@lottiefiles/react-lottie-player"
import lottieJson from "../../animation/71439-girl-working-on-computer.json"

export function DeletedAccount() {
	const history = useHistory()
	const css = useStyles()
	return (
		<Box component="div" className={css.container}>
			<Player autoplay loop src={lottieJson} style={{ height: "250px", width: "400px" }}></Player>
			<Typography fontFamily="Pacifico" fontSize="30" sx={{ mb: 4 }}>
				Study Nook
			</Typography>
			<Typography variant="subtitle1">We've successfully deleted you're account and we're sorry to see you go!</Typography>
			<Typography>Reach out to us at studynookapp@gmail.com if you have anything you want to share.</Typography>
			<Button className={css.button} variant="contained" color="primary" onClick={() => history.push("/registration")} sx={{ mt: 4 }}>
				Register
			</Button>
		</Box>
	)
}
