import { Button, Fade, Typography } from "@material-ui/core"
import { useHistory, Route, Redirect } from "react-router-dom"
import { useState } from "react"

import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"

import { GameInterface } from "../../components"
import { Level } from "../../components"
import { Coins } from "../../components"

import { useStyles } from "./dashboardCss"
import NavigationBar from "../../components/bottomNavigation"

export function Dashboard() {
	useGetState()
	const css = useStyles()
	const { currentUser } = ContextContainer.useContainer()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<div>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Fade in={true} timeout={1000}>
				<div className={css.container}>
					<GameInterface />
					<Level />
					<Coins />

					<Typography className={css.username}>{currentUser.username}</Typography>

					<Button className={css.changeAvatarButton} variant="contained" color="primary" onClick={() => history.push("/changeAvatar")}>
						Change Avatar
					</Button>

					<Button className={css.changeBackgroundButton} variant="contained" color="primary" onClick={() => history.push("/changeBackground")}>
						Change Background
					</Button>

					<Button className={css.startNookingButton} variant="contained" color="primary" onClick={() => history.push("/nookingSetup")}>
						Start Nooking
					</Button>

					<NavigationBar />
				</div>
			</Fade>
		</div>
	)
}
