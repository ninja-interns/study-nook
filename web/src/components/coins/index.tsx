import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"

import { useStyles } from "./coinsCss"
import coinsIcon from "../../assets/coins.png"

export function Coins() {
	const css = useStyles()
	useGetState()
	const { currentUser } = ContextContainer.useContainer()

	return (
		<div className={css.coinsWrapper}>
			<img className={css.coinsIcon} src={coinsIcon} alt="coins" id={coinsIcon} />
			<p className={css.coinsNumber}>{currentUser.coins}</p>
		</div>
	)
}
