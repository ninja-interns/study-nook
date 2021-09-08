import Button from "@material-ui/core/Button"
import React, { useState } from "react"
import { Redirect, Route } from "react-router-dom"
import { useStyles } from "./homeCss"

export function Home() {
	const css = useStyles()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect to={redirect} /> : null)} />
			<div className={css.container}>
				<div className={css.verticalCenter}>
					<h3 className={css.imageCss}>Cute Image Here</h3>
				</div>

				<div className={css.buttonsClass}>
					<div className={css.left}>
						<Button
							onClick={() => {
								setRedirect("/registration")
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
								setRedirect("/login")
							}}
						>
							Login
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
