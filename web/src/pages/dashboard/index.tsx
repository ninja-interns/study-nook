import { Button, Fade, Typography, LinearProgress, styled } from "@material-ui/core"
import { useHistory, Route, Redirect } from "react-router-dom"
import { useState } from "react"

import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"

import { GameInterface } from "../../components/gameInterface"
import { Level } from "../../components/level"
import { useStyles } from "./dashboardCss"

import coinsIcon from "../../assets/coins.png"

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

					<Typography className={css.username}>{currentUser.username}</Typography>

					<Level />

					<div className={css.coinsWrapper}>
						<img className={css.coinsIcon} src={coinsIcon} alt="coins" id={coinsIcon} />
						<p className={css.coinsNumber}>{currentUser.coins}</p>
					</div>

					<Button className={css.startNookingButton} variant="contained" color="primary" onClick={() => history.push("/nookingSetup")}>
						Start Nooking
					</Button>
					<Button className={css.menuButton} variant="contained" color="primary" onClick={() => history.push("/menu")}>
						Menu
					</Button>
				</div>
			</Fade>
		</div>
	)
}
