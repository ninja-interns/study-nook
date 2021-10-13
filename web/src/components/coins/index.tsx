import { Box, Container, Typography } from "@mui/material"
import coinsIcon from "../../assets/coins.png"
import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"

export function Coins() {
	useGetState()
	const { currentUser } = ContextContainer.useContainer()

	return (
		<Box
			sx={{
				position: "absolute",
				margin: "25px",
				right: "5px",
				top: "100px",
				flexDirection: "row",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				component="img"
				src={coinsIcon}
				alt="coins"
				id={coinsIcon}
				sx={{
					width: "30px",
					float: "left",
					marginRight: "10px",
				}}
			/>
			<Typography
				sx={{
					float: "right",
					fontSize: "18px",
				}}
			>
				{currentUser.coins}
			</Typography>
		</Box>
	)
}
