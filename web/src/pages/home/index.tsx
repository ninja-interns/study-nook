import { Home } from "../../components"
import { Fade } from "@material-ui/core"

export function HomePage() {
	return (
		<Fade in={true} timeout={1000}>
			<div>
				{/* Implement the app bar component */}
				{/* Add UnDraw here */}
				<Home />
			</div>
		</Fade>
	)
}
