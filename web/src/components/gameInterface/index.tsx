import { Box, Container } from "@mui/material"
import images from "../../assets/Avatars"
import backgrounds from "../../assets/Backgrounds"
import { ContextContainer } from "../../contexts/ContextContainer"

export function GameInterface() {
	const { currentUser } = ContextContainer.useContainer()

	const imageStyle = {
		backgroundImage: `url(${backgrounds[currentUser.currentBackground]})`,
	}

	return (
		<Box
			style={imageStyle}
			sx={{
				width: "350px",
				height: "200px",
				border: "solid black",
				borderWidth: "1px",
				backgroundSize: "350px 200px",
			}}
		>
			<Box
				component="img"
				src={images[currentUser.currentAvatar]}
				sx={{
					width: "80px",
					height: "120px",
					position: "relative",
					display: "block",
					left: "120px",
					bottom: "0px",
					top: "70px",
				}}
			/>
		</Box>
	)
}
