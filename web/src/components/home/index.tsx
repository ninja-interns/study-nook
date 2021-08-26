import { useStyles } from "./homeCss"
import Button from "@material-ui/core/Button"
import { useHistory } from "react-router-dom"

export function Home() {
	const css = useStyles()
	const history = useHistory()

	return (
		<div className={css.container}>
			<div className={css.verticalCenter}>
				<h3 className={css.imageCss}>Cute Image Here</h3>
			</div>

			<div className={css.buttonsClass}>
				<div className={css.left}>
					<Button
						onClick={() => {
							history.push("/registration")
						}}
						variant="contained"
						color="primary"
					>
						Create Account
					</Button>
				</div>

				<div className={css.right}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							history.push("/login")
						}}
					>
						Login
					</Button>
				</div>
			</div>
		</div>
	)
}
