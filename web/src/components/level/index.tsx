import { Box, Container, LinearProgress, linearProgressClasses, styled, Typography } from "@mui/material"
import levelIcon from "../../assets/star.png"
import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	width: 150,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.type === "light" ? "#1a90ff" : "#308fe8",
	},
}))

export function Level() {
	useGetState()
	const { currentUser } = ContextContainer.useContainer()

	return (
		// position on the page
		<Box
			sx={{
				display: "flex",
				margin: "25px",
				position: "absolute",
				top: "50px",
				right: 0,
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "row",
				}}
			>
				<Box
					sx={{
						float: "left",
						width: "35px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box
						component="img"
						src={levelIcon}
						alt="level-star"
						id={levelIcon}
						sx={{
							width: "35px",
						}}
					/>
					<Typography
						sx={{
							position: "absolute",
							fontSize: "12px",
							marginTop: "3px",
						}}
					>
						{currentUser.level}
					</Typography>
				</Box>
				<BorderLinearProgress variant="determinate" value={currentUser.experience} />
			</Box>
		</Box>
	)
}
