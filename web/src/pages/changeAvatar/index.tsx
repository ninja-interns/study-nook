import { Slide, Fade, Typography } from "@material-ui/core"
import { useStyles } from "./changeAvatarCss"
import { useHistory, Route, Redirect } from "react-router-dom"
import { useState } from "react"
import { Fab } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import { Avatar } from "../../components/avatar"

export function ChangeAvatarPage() {
	const css = useStyles()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Slide in={true} direction={"left"} timeout={1000}>
				<div className={css.container}>
					<div className={css.topWrapper}>
						<Typography className={css.pageTitle}>Change Avatar</Typography>
						<Fab
							size="small"
							color="primary"
							onClick={() => history.goBack()}
							sx={{ position: "absolute", top: "0px", right: "0px", margin: "20px" }}
						>
							<CloseIcon fontSize="medium" />
						</Fab>
					</div>

					<Fade in={true} timeout={2000}>
						<div className={css.avatarsGrid}>
							<Avatar avatar={"avatar1"} />

							<Avatar avatar={"avatar2"} />

							<Avatar avatar={"avatar3"} />

							<Avatar avatar={"avatar4"} />

							<Avatar avatar={"avatar5"} />

							<Avatar avatar={"avatar6"} />

							<Avatar avatar={"avatar7"} />

							<Avatar avatar={"avatar8"} />

							<Avatar avatar={"avatar9"} />

							<Avatar avatar={"avatar10"} />

							<Avatar avatar={"avatar11"} />

							<Avatar avatar={"avatar12"} />

							<Avatar avatar={"avatar13"} />
						</div>
					</Fade>

					<div className={css.bottomWrapper}></div>
				</div>
			</Slide>
		</>
	)
}
