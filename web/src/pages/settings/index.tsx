import { Player } from "@lottiefiles/react-lottie-player"
import { Slide, Typography } from "@material-ui/core"
import { Box, Fab } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useHistory, Route, Redirect } from "react-router-dom"
import { useState } from "react"
import { useGetState } from "./../../utils/getState"
import { useStyles } from "./settingsCss"
import { DeleteAccount } from "../../components"

export function Settings() {
	useGetState()
	const css = useStyles()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<div>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Slide in={true} direction={"left"} timeout={1000}>
				<div className={css.container}>
					<Fab size="medium" color="primary" onClick={() => history.goBack()} sx={{ position: "absolute", top: "0px", right: "0px", margin: "20px" }}>
						<CloseIcon fontSize="medium" />
					</Fab>

					<div className={css.optionsContainer}>
						<Typography className={css.option} variant={"h4"} onClick={() => history.push("./updateUser")}>
							Update Profile
						</Typography>
						<Typography className={css.option} variant={"h4"} onClick={() => history.push("./updatePassword")}>
							Change Password
						</Typography>
						<Box component="div">
							<DeleteAccount />
						</Box>
					</div>
				</div>
			</Slide>
		</div>
	)
}
