import { Slide, Fade } from "@material-ui/core"
import { useStyles } from "./achievementsCss"
import { useHistory, Route, Redirect } from "react-router-dom"
import { useState, useEffect } from "react"

import { ContextContainer } from "../../contexts/ContextContainer"
import closeButton from "../../assets/close-button.png"
import { Badge } from "../../components"

interface IResponse {
	unlocked: boolean
}

interface IUnlocked {
	level_medal_1: boolean
	level_medal_2: boolean
	level_medal_3: boolean
	sessions_medal_1: boolean
	sessions_medal_2: boolean
	sessions_medal_3: boolean
	hours_medal_1: boolean
	hours_medal_2: boolean
	hours_medal_3: boolean
	backgrounds_medal_1: boolean
	backgrounds_medal_2: boolean
	backgrounds_medal_3: boolean
	avatar_medal_1: boolean
	avatar_medal_2: boolean
	avatar_medal_3: boolean
	level: number
	sessions_completed: number
	hours_focused: number
	backgrounds: number
	avatars: number
}

export function AchievementsPage() {
	const css = useStyles()
	const { currentUser } = ContextContainer.useContainer()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)
	const [unlocked, setUnlocked] = useState<IUnlocked>()

	useEffect(() => {
		let isMounted = true
		;(async () => {
			try {
				const response = await fetch("http://localhost:8080/api/achievement_check", {
					method: "POST",
					headers: { "content-type": "application/json" },
				})
				const data: IUnlocked = await response.json()
				setUnlocked(data)
				console.log(data)
			} catch (err) {
				console.error(err)
			}
		})()
		return () => {
			isMounted = false
		}
	}, [])

	function progressBar(current: number | undefined, goal: number) {
		if (current != undefined) {
			let result = (current / goal) * 100
			if (result <= 100) return result
			else return 100
		}
	}

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Slide in={true} direction={"left"} timeout={1000}>
				<div className={css.container}>
					<img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>

					<Fade in={true} timeout={2000}>
						<div className={css.badgesTable}>
							<Badge
								badgeID={"level_medal_1"}
								badgeType={"Level badge"}
								badgeLevel={"Level 1"}
								progression={unlocked?.level}
								goal={1}
								isUnlocked={unlocked?.level_medal_1}
								progressBar={progressBar(unlocked?.level, 1)}
							/>

							<Badge
								badgeID={"level_medal_2"}
								badgeType={"Level badge"}
								badgeLevel={"Level 10"}
								progression={unlocked?.level}
								goal={10}
								isUnlocked={unlocked?.level_medal_2}
								progressBar={progressBar(unlocked?.level, 10)}
							/>

							<Badge
								badgeID={"level_medal_3"}
								badgeType={"Level badge"}
								badgeLevel={"Level 20"}
								progression={unlocked?.level}
								goal={20}
								isUnlocked={unlocked?.level_medal_3}
								progressBar={progressBar(unlocked?.level, 20)}
							/>

							<Badge
								badgeID={"sessions_medal_1"}
								badgeType={"Session completed"}
								badgeLevel={"1 Session"}
								progression={unlocked?.sessions_completed}
								goal={1}
								isUnlocked={unlocked?.sessions_medal_1}
								progressBar={progressBar(unlocked?.sessions_completed, 1)}
							/>

							<Badge
								badgeID={"sessions_medal_2"}
								badgeType={"Session completed"}
								badgeLevel={"10 Session"}
								progression={unlocked?.sessions_completed}
								goal={10}
								isUnlocked={unlocked?.sessions_medal_2}
								progressBar={progressBar(unlocked?.sessions_completed, 10)}
							/>

							<Badge
								badgeID={"sessions_medal_3"}
								badgeType={"Session completed"}
								badgeLevel={"20 Session"}
								progression={unlocked?.sessions_completed}
								goal={20}
								isUnlocked={unlocked?.sessions_medal_3}
								progressBar={progressBar(unlocked?.sessions_completed, 20)}
							/>

							<Badge
								badgeID={"hours_medal_1"}
								badgeType={"Hours focused"}
								badgeLevel={"1 hour"}
								progression={unlocked?.hours_focused}
								goal={1}
								isUnlocked={unlocked?.hours_medal_1}
								progressBar={progressBar(unlocked?.hours_focused, 1)}
							/>

							<Badge
								badgeID={"hours_medal_2"}
								badgeType={"Hours focused"}
								badgeLevel={"5 hours"}
								progression={unlocked?.hours_focused}
								goal={5}
								isUnlocked={unlocked?.hours_medal_2}
								progressBar={progressBar(unlocked?.hours_focused, 5)}
							/>

							<Badge
								badgeID={"hours_medal_3"}
								badgeType={"Hours focused"}
								badgeLevel={"10 hours"}
								progression={unlocked?.hours_focused}
								goal={10}
								isUnlocked={unlocked?.hours_medal_3}
								progressBar={progressBar(unlocked?.hours_focused, 10)}
							/>

							<Badge
								badgeID={"backgrounds_medal_1"}
								badgeType={"Focus Zones unlocked"}
								badgeLevel={"2 zones"}
								progression={unlocked?.backgrounds}
								goal={2}
								isUnlocked={unlocked?.backgrounds_medal_1}
								progressBar={progressBar(unlocked?.backgrounds, 2)}
							/>

							<Badge
								badgeID={"backgrounds_medal_2"}
								badgeType={"Focus Zones unlocked"}
								badgeLevel={"5 zones"}
								progression={unlocked?.backgrounds}
								goal={5}
								isUnlocked={unlocked?.backgrounds_medal_2}
								progressBar={progressBar(unlocked?.backgrounds, 5)}
							/>

							<Badge
								badgeID={"backgrounds_medal_3"}
								badgeType={"Focus Zones unlocked"}
								badgeLevel={"7 zones"}
								progression={unlocked?.backgrounds}
								goal={7}
								isUnlocked={unlocked?.backgrounds_medal_3}
								progressBar={progressBar(unlocked?.backgrounds, 7)}
							/>

							<Badge
								badgeID={"avatars_medal_1"}
								badgeType={"Avatars unlocked"}
								badgeLevel={"2 avatars"}
								progression={unlocked?.avatars}
								goal={2}
								isUnlocked={unlocked?.avatar_medal_1}
								progressBar={progressBar(unlocked?.avatars, 2)}
							/>

							<Badge
								badgeID={"avatars_medal_2"}
								badgeType={"Avatars unlocked"}
								badgeLevel={"5 avatars"}
								progression={unlocked?.avatars}
								goal={5}
								isUnlocked={unlocked?.avatar_medal_2}
								progressBar={progressBar(unlocked?.avatars, 5)}
							/>

							<Badge
								badgeID={"avatars_medal_3"}
								badgeType={"Avatars unlocked"}
								badgeLevel={"10 avatars"}
								progression={unlocked?.avatars}
								goal={10}
								isUnlocked={unlocked?.avatar_medal_3}
								progressBar={progressBar(unlocked?.avatars, 10)}
							/>
						</div>
					</Fade>
				</div>
			</Slide>
		</>
	)
}
