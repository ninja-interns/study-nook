import { Slide, Fade } from "@material-ui/core"
import { useStyles } from "./achievementsCss"
import { useHistory, Route, Redirect } from "react-router-dom"
import { useState } from "react"

import closeButton from "../../assets/close-button.png"
import { Badge } from "../../components"

interface IResponse {
	unlocked: boolean
}

interface IUnlocked {
	unlocked: boolean
}

export function AchievementsPage() {
	const css = useStyles()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)
	const [unlocked, setUnlocked] = useState<IUnlocked>()

	let isUnlocked = false

	function UnlockedCheck(badgeID: string) {
		;(async () => {
			try {
				const response = await fetch("/api/achievement_check", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ BadgeID: badgeID }),
				})
				const data: IResponse = await response.json()
				setUnlocked(data)
				console.log(data)
			} catch (err) {
				console.error(err)
			}
		})()
		return {}
	}

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Slide in={true} direction={"left"} timeout={1000}>
				<div className={css.container}>
					<img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>

					<Fade in={true} timeout={2000}>
						<div className={css.badgesTable}>
							<Badge badgeID={"level_medal_1"} badgeType={"Level badge"} badgeLevel={"Level 1"} progression={1} goal={1} />

							<Badge badgeID={"level_medal_2"} badgeType={"Level badge"} badgeLevel={"Level 10"} progression={15} goal={10} />

							<Badge badgeID={"level_medal_3"} badgeType={"Level badge"} badgeLevel={"Level 20"} progression={0} goal={20} />

							<Badge badgeID={"sessions_medal_1"} badgeType={"Session completed"} badgeLevel={"1 Session"} progression={0} goal={1} />

							<Badge badgeID={"sessions_medal_2"} badgeType={"Session completed"} badgeLevel={"10 Session"} progression={0} goal={10} />

							<Badge badgeID={"sessions_medal_3"} badgeType={"Session completed"} badgeLevel={"20 Session"} progression={0} goal={20} />

							<Badge badgeID={"hours_medal_1"} badgeType={"Hours focused"} badgeLevel={"1 hour"} progression={0} goal={1} />

							<Badge badgeID={"hours_medal_2"} badgeType={"Hours focused"} badgeLevel={"5 hours"} progression={0} goal={5} />

							<Badge badgeID={"hours_medal_3"} badgeType={"Hours focused"} badgeLevel={"10 hours"} progression={0} goal={10} />

							<Badge badgeID={"backgrounds_medal_1"} badgeType={"Focus Zones unlocked"} badgeLevel={"2 zones"} progression={0} goal={2} />

							<Badge badgeID={"backgrounds_medal_2"} badgeType={"Focus Zones unlocked"} badgeLevel={"5 zones"} progression={0} goal={5} />

							<Badge badgeID={"backgrounds_medal_3"} badgeType={"Focus Zones unlocked"} badgeLevel={"7 zones"} progression={0} goal={7} />

							<Badge badgeID={"avatars_medal_1"} badgeType={"Avatars unlocked"} badgeLevel={"2 avatars"} progression={0} goal={2} />

							<Badge badgeID={"avatars_medal_2"} badgeType={"Avatars unlocked"} badgeLevel={"5 avatars"} progression={0} goal={5} />

							<Badge badgeID={"avatars_medal_3"} badgeType={"Avatars unlocked"} badgeLevel={"10 avatars"} progression={0} goal={10} />
						</div>
					</Fade>
				</div>
			</Slide>
		</>
	)
}
