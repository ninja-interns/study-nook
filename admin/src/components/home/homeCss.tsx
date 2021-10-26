import { makeStyles } from "@material-ui/styles"
import pastelBookShelf from "../../assets/pastelBookShelf.jpg"

export const useStyles = makeStyles({
	container: {
		display: "flex",
		height: "100%",
		width: "100%",
		flexDirection: "column",
		justifyContent: "space-between",
		textAlign: "center",
		padding: "1rem",
		backgroundImage: `url(${pastelBookShelf})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center center",
	},
	buttonContainer: {
		display: "flex",
		position: "sticky",
		width: "100%",
		justifyContent: "space-between",
	},
	button: {
		margin: "1rem",
		width: "75%",
	},
})
