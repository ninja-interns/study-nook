import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"
import { Player } from "@lottiefiles/react-lottie-player"

import { useStyles } from "./coinsCss"
import coinsIcon from "../../assets/coins.png"

export function Coins() {
	const css = useStyles()
	useGetState()
	const { currentUser } = ContextContainer.useContainer()
	const coinsJson = "https://assets3.lottiefiles.com/packages/lf20_CbT8Hi.json"

	return (
		<div className={css.coinsWrapper}>
			<Player autoplay loop src={coinsJson} style={{ height: "50px", width: "50px", float: "left" }} />
			<p className={css.coinsNumber}>{currentUser.coins}</p>
		</div>
	)
}
