import { Button, Slide, Typography } from "@material-ui/core"
import { useHistory, Route, Redirect } from "react-router-dom"
import { useState } from "react"

import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"

import { useStyles } from "./settingsCss"

import closeButton from "../../assets/close-button.png"

export function Settings() {
	useGetState()
	const css = useStyles()
	const { currentUser } = ContextContainer.useContainer()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<div>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Slide in={true} direction={"left"} timeout={1000}>
				<div className={css.container}>
					<img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>

					<div className={css.optionsContainer}>
						<Typography className={css.option} variant={"h4"} onClick={() => history.push("./updateUser")}>
							Change Username
						</Typography>
						<Typography className={css.option} variant={"h4"} onClick={() => history.push("./updatePassword")}>
							Change Password
						</Typography>
					</div>
				</div>
			</Slide>
		</div>
	)
}
