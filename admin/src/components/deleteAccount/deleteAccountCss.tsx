import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	container: {
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	buttonContainer: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
	},
	button: {
		margin: "1rem",
		width: "75%",
	},
})
