import { linearProgressClasses } from "@mui/material"
import { LinearProgress, styled } from "@material-ui/core"

import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"

import { useStyles } from "./levelCss"
import levelIcon from "../../assets/star.png"

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
	const css = useStyles()
	const { currentUser } = ContextContainer.useContainer()

	return (
		<div className={css.levelItems}>
			<div className={css.levelWrapper}>
				<div className={css.levelIcon}>
					<img className={css.star} src={levelIcon} alt="level-star" id={levelIcon} />
					<p className={css.levelNumber}>{currentUser.level}</p>
				</div>
				<BorderLinearProgress className={css.levelBar} variant="determinate" value={currentUser.experience} />
			</div>
		</div>
	)
}
