import React, { useEffect, useState } from "react"
import { useStyles } from "./badgeCss"
import { linearProgressClasses } from "@mui/material"
import { LinearProgress, styled } from "@material-ui/core"

import badgeIcon from "../../assets/medal.png"
import locker from "../../assets/lock.png"

interface BadgeProps {
	badgeID: string
	badgeType: string
	badgeLevel: string
	progression: number | undefined
	goal: number
	isUnlocked: boolean | undefined
	progressBar: number | undefined
}

interface IResponse {
	unlocked: boolean
}

interface Unlocked {
	unlocked: boolean
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	width: 140,
	borderRadius: 25,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.type === "light" ? "#1a90ff" : "#308fe8",
	},
}))

export function Badge({ badgeID, badgeType, badgeLevel, progression, goal, isUnlocked, progressBar }: BadgeProps): JSX.Element {
	function Locked() {
		if (!isUnlocked) return <img src={locker} className={css.locker} />
		else return <></>
	}

	const css = useStyles()

	return (
		<div className={css.achievementContainer}>
			<figure>
				<Locked />
				<img className={isUnlocked ? css.badgeElement : css.badgeElementLocked} src={badgeIcon} alt="badge" id={badgeID} />

				<figcaption className={css.badgeCaption}>
					{badgeType} - {badgeLevel}
				</figcaption>
				<span className={css.textBox}>
					{" "}
					Progression:
					<p className={css.tracker}>
						{progression}/{goal}
					</p>
					<BorderLinearProgress className={css.bar} variant="determinate" value={progressBar} />
				</span>
			</figure>
		</div>
	)
}
