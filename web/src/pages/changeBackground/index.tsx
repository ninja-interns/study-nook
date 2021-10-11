import { Slide, Fade, Typography } from "@material-ui/core"
import { useStyles } from "./changeBackgroundCss"
import { useHistory, Route, Redirect } from "react-router-dom"
import { useState } from "react"

import closeButton from "../../assets/close-button.png"

import { Background } from "../../components/background"

export function ChangeBackgroundPage() {
	const css = useStyles()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Slide in={true} direction={"left"} timeout={1000}>
				<div className={css.container}>
					<div className={css.topWrapper}>
						<Typography className={css.pageTitle}>Change Focus Zone</Typography>
						<img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>
					</div>

					<Fade in={true} timeout={2000}>
						<div>
							<Background background={"zone1"} />

							<Background background={"zone2"} />

							<Background background={"zone3"} />

							<Background background={"zone4"} />

							<Background background={"zone5"} />

							<Background background={"zone6"} />

							<Background background={"zone7"} />

							<Background background={"zone8"} />

							<Background background={"zone9"} />
						</div>
					</Fade>

					<div className={css.bottomWrapper}></div>
				</div>
			</Slide>
		</>
	)
}
