import { Box, Button, Fade, Typography } from "@mui/material"
import { useState } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import { Coins, GameInterface, Level } from "../../components"
import NavigationBar from "../../components/bottomNavigation"
import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"
import { useStyles } from "./dashboardCss"

export function Dashboard() {
	useGetState()
	const css = useStyles()
	const history = useHistory()
	const { currentUser } = ContextContainer.useContainer()
	const [redirect, setRedirect] = useState<string | null>(null)

	//* This checks if there is a current nooking session, if there is it redirects the user to the nooking page
	chrome.storage.sync.get(["key"], function (result) {
		if (result.key === true) {
			setRedirect("/nooking")
		}
	})

	return (
		<div>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Fade in={true} timeout={1000}>
				<Box component="div" sx={{ position: "relative", width: 400, height: 600 }}>
					<GameInterface />
					<Level />
					<Coins />

					<Typography className={css.username}>{currentUser.username}</Typography>

					<Button
						variant="contained"
						color="primary"
						onClick={() => history.push("/changeAvatar")}
						sx={{
							position: "absolute",
							left: "0",
							top: "214px",
							margin: "20px",
							fontSize: "12px",
						}}
					>
						Change Avatar
					</Button>

					<Button
						variant="contained"
						color="primary"
						onClick={() => history.push("/changeBackground")}
						sx={{
							position: "absolute",
							right: "0",
							top: "214px",
							margin: "20px",
							fontSize: "12px",
						}}
					>
						Change Background
					</Button>

					<NavigationBar />
				</Box>
			</Fade>
		</div>
	)
}
