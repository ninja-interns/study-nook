import React from "react"
import { Button } from "@material-ui/core"
import { useHistory } from "react-router"

import { useStyles } from "./backgroundCss"

import backgrounds from "../../assets/Backgrounds"

interface BackgroundProps {
	background: keyof typeof backgrounds
}

export function Background({ background }: BackgroundProps) {
	const css = useStyles()
	const history = useHistory() // user route history

	const imageStyle = {
		backgroundImage: `url(${backgrounds[background]})`,
	}

	async function handleSelectSubmit() {
		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch("http://localhost:8080/api/change_background", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ currentBackground: background }),
			})
			//awaiting the response to comeback and turn it into readable json data
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
		} catch (err) {
			console.log(err)
		}

		history.push("/dashboard")
	}

	return (
		<>
			<div className={css.optionWrapper}>
				<div className={css.svgBox} style={imageStyle}></div>
				<Button className={css.selectButton} variant="contained" color="primary" onClick={handleSelectSubmit}>
					Select
				</Button>
			</div>
		</>
	)
}
