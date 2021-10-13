import { Box, Button, Container } from "@mui/material"
import React from "react"
import { useHistory } from "react-router"
import backgrounds from "../../assets/Backgrounds"

interface BackgroundProps {
	background: keyof typeof backgrounds
}

export function Background({ background }: BackgroundProps) {
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
		<Container
			sx={{
				marginBottom: "10px",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Box
				component="img"
				style={imageStyle}
				sx={{
					width: "350px",
					height: "200px",
					border: "solid black",
					margin: "20px",
					borderWidth: "1px",
					backgroundSize: "350px 200px",
					display: "block",
				}}
			></Box>
			<Button
				variant="contained"
				color="primary"
				onClick={handleSelectSubmit}
				sx={{
					width: "80px",
					alignSelf: "flex-end",
					right: "20px",
				}}
			>
				Select
			</Button>
		</Container>
	)
}
