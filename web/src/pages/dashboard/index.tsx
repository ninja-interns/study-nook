import { useStyles } from "./dashboardCss"
import { Box, Button, Fade, Typography } from "@mui/material"
import { useState } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import { Player } from "@lottiefiles/react-lottie-player"
//import { create } from "@lottiefiles/lottie-interactivity"

import { Coins, GameInterface, Level } from "../../components"
import NavigationBar from "../../components/bottomNavigation"
import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"
import theme from "../../theme"

export function Dashboard() {
	useGetState()
	const history = useHistory()
	const { currentUser } = ContextContainer.useContainer()
	const [redirect, setRedirect] = useState<string | null>(null)
	const studyJson = "https://assets4.lottiefiles.com/packages/lf20_au98facn.json"

	//* This checks if there is a current nooking session, if there is it redirects the user to the nooking page
	chrome.storage.sync.get(["key"], function (result) {
		if (result.key === true) {
			setRedirect("/nooking")
		}
	})

	return (
		<div>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Box component="div" sx={{ position: "relative", width: 400, height: 600 }}>
				<Fade in={true} timeout={1000}>
					<div>
						<Typography fontFamily="Pacifico" fontSize="30" sx={{ pb: 2, position: "absolute", top: "0", left: "0", margin: "20px" }}>
							Study Nook
						</Typography>

						<Typography
							sx={{
								position: "absolute",
								margin: "25px",
								marginTop: "35px",
								top: "0px",
								right: "0px",
								fontFamily: "arial",
								fontSize: "17px",
								textTransform: "uppercase",
							}}
						>
							{currentUser.username}
						</Typography>

						<GameInterface />
						<Level />
						<Coins />

						<Button
							variant="contained"
							color="primary"
							onClick={() => history.push("/changeAvatar")}
							sx={{ position: "absolute", left: "0", top: "214px", margin: "20px", fontSize: "12px" }}
						>
							Change Avatar
						</Button>

						<Button
							variant="contained"
							color="primary"
							onClick={() => history.push("/changeBackground")}
							sx={{ position: "absolute", right: "0", top: "214px", margin: "20px", fontSize: "12px" }}
						>
							Change Background
						</Button>
					</div>
				</Fade>

				<NavigationBar />
			</Box>
		</div>
	)
}
