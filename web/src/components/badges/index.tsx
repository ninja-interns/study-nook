import React, { useEffect, useState } from "react"
import { useStyles } from "./badgeCss"

import badgeIcon from "../../assets/medal.png"

interface BadgeProps {
	badgeID: string
	badgeType: string
	badgeLevel: string
	progression: number
	goal: number
}

interface IResponse {
	unlocked: boolean
}

interface Unlocked {
	unlocked: boolean
}

export function Badge({ badgeID, badgeType, badgeLevel, progression, goal }: BadgeProps): JSX.Element {
	let isUnlocked = false

	function setIsUnlocked(data: Unlocked) {
		isUnlocked = data.unlocked
	}

	useEffect(() => {
		let isMounted = true
		;(async () => {
			try {
				const response = await fetch("/api/achievement_check", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ BadgeID: badgeID }),
				})
				const data: IResponse = await response.json()
				if (isMounted) {
					setIsUnlocked(data)
				}
			} catch (err) {
				console.error(err)
			}
		})()
		return () => {
			isMounted = false
		}
	}, [setIsUnlocked])

	const css = useStyles(isUnlocked)

	return (
		<figure>
			<img className={css.badgeElement} src={badgeIcon} alt="badge" id={badgeID} />
			<figcaption className={css.badgeCaption}>
				{badgeType} - {badgeLevel}
			</figcaption>
			<span className={css.textBox}>
				{" "}
				Progression:
				<p className={css.tracker}>
					{progression}/{isUnlocked}
				</p>
				<span className={css.bar}>
					<span className={css.achievement}></span>
				</span>
			</span>
		</figure>
	)
}
