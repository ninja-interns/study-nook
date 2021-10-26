import React from "react"
import { Button } from "@material-ui/core"
import { useHistory } from "react-router"

import { useStyles } from "./avatarCss"

import avatars from "../../assets/Avatars"
import { DomainContainer } from "../../contexts/DomainContext"

interface AvatarProps {
	avatar: keyof typeof avatars
}

export function Avatar({ avatar }: AvatarProps) {
	const css = useStyles()
	const { url } = DomainContainer.useContainer()
	const history = useHistory() // user route history

	const imageStyle = {
		backgroundImage: `url(${avatars[avatar]})`,
	}

	async function handleSelectSubmit() {
		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch(`${url}/api/change_avatar`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ currentAvatar: avatar }),
			})
			//awaiting the response to comeback and turn it into readable json data
			//if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
		} catch (err) {
			console.log(err)
		}

		history.push("/dashboard")
	}

	return (
		<div className={css.optionWrapper}>
			<div className={css.avatarContainer}>
				<img src={avatars[avatar]} className={css.avatarStyle} />
			</div>
			<Button className={css.selectButton} variant="contained" color="primary" onClick={handleSelectSubmit}>
				Select
			</Button>
		</div>
	)
}
