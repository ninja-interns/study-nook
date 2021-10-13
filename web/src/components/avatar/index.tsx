import { Box, Button, Container } from "@mui/material"
import React from "react"
import { useHistory } from "react-router"
import avatars from "../../assets/Avatars"

interface AvatarProps {
	avatar: keyof typeof avatars
}

export function Avatar({ avatar }: AvatarProps) {
	const history = useHistory() // user route history

	const imageStyle = {
		backgroundImage: `url(${avatars[avatar]})`,
	}

	async function handleSelectSubmit() {
		//hitting the backend route of /loginUser with the body of necessary values
		try {
			const response = await fetch("http://localhost:8080/api/change_avatar", {
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
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					width: "70px",
					height: "150px",
					display: "flex",
				}}
			>
				<Box
					component="img"
					src={avatars[avatar]}
					sx={{
						height: "150px",
						width: "70px",
					}}
				/>
			</Box>
			<Button
				variant="contained"
				color="primary"
				onClick={handleSelectSubmit}
				sx={{
					width: "80px",
					top: "10px",
					fontSize: "10px",
				}}
			>
				Select
			</Button>
		</Box>
	)
}
