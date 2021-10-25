import { useStyles } from "./menuCss"
import { useState } from "react"
import { Typography, Fade } from "@material-ui/core"
import { useHistory, Route, Redirect } from "react-router-dom"
import { Logout } from "../../components"

import NavigationBar from "../../components/bottomNavigation"

export function MenuPage() {
	const css = useStyles()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<div className={css.container}>
				<Fade in={true} timeout={1000}>
					<div>
						<Typography className={css.options} variant="h4" onClick={() => history.push("./settings")}>
							Settings
						</Typography>
						<Typography className={css.options} variant="h4" onClick={() => history.push("./achievements")}>
							Achievements
						</Typography>
						<Typography className={css.options} variant="h4" onClick={() => history.push("./support")}>
							Support
						</Typography>
						<Typography className={css.options} variant="h4">
							<Logout />
						</Typography>
					</div>
				</Fade>
				<NavigationBar />
			</div>
		</>
	)
}
