import { Fade } from "@material-ui/core"

import { useStyles } from "./gameInterfaceCss"
import { ContextContainer } from "../../contexts/ContextContainer"

import images from "../../assets/Avatars"
import backgrounds from "../../assets/Backgrounds"

export function GameInterface() {
	const css = useStyles()
	const { currentUser } = ContextContainer.useContainer()

	const imageStyle = {
		backgroundImage: `url(${backgrounds[currentUser.currentBackground]})`,
	}

	return (
		<>
			<Fade in={true} timeout={1000}>
				<div className={css.container}>
					<div className={css.svgBox} style={imageStyle}>
						<img src={images[currentUser.currentAvatar]} className={css.svgCharacter} />
					</div>
				</div>
			</Fade>
		</>
	)
}
