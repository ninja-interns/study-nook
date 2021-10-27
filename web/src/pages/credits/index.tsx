import { useStyles } from "./creditsCss"
import { useState } from "react"
import { Typography, Fade } from "@material-ui/core"
import { useHistory, Route, Redirect } from "react-router-dom"
import { Logout } from "../../components"
import { Player } from "@lottiefiles/react-lottie-player"

export function Credits() {
	const css = useStyles()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<div className={css.container}>
				<Typography className={css.appName}>Study Nook</Typography>

				<p className={css.ninjaThanks}>
					Study Nook thanks Ninja Software for all the support, tranning and motivation. We could never do this without you guys.
				</p>

				<div className={css.creditsText}>
					<p className={css.text}>
						Developers: <br />
						Alicia Biggs <br />
						Alyssa Ruefenacht <br />
						Sanam Limbu <br />
						Joao Soares
					</p>
				</div>

				<div className={css.attributeText}>
					{" "}
					<p className={css.attributeFont}>
						Attributions:
						<br />
						<br />
						Focus Zones: <a href="https://www.freepik.com/vectors">www.freepik.com</a>
						<br />
						<br />
						Star level icon:
						<br />
						made by:{" "}
						<a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">
							Pixel perfect
						</a>
						<br />
						from:{" "}
						<a href="https://www.flaticon.com/" title="Flaticon">
							www.flaticon.com
						</a>
						<br />
						<br />
						Coins icon:
						<br />
						made by:{" "}
						<a href="https://www.freepik.com" title="Freepik">
							Freepik
						</a>
						<br />
						from:{" "}
						<a href="https://www.flaticon.com/" title="Flaticon">
							www.flaticon.com
						</a>
						<br />
						<br />
						Locker icon:
						<br />
						made by:{" "}
						<a href="https://www.freepik.com" title="Freepik">
							Freepik
						</a>
						<br />
						from:{" "}
						<a href="https://www.flaticon.com/" title="Flaticon">
							www.flaticon.com
						</a>
						<br />
						<br />
						Avatars: <a href="https://geeme.vercel.app/">https://geeme.vercel.app</a>
					</p>
				</div>
			</div>
		</>
	)
}
