import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	container: {
		height: "100%",
		width: "100%",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		padding: "1rem",
	},
	buttonContainer: {
		display: "flex",
		width: "100%",
		justifyContent: "space-around",
		marginTop: 2,
	},
	button: {
		margin: "1rem",
		width: "45%",
		padding: "2px",
	},
})
