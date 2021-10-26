import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	container: {
		width: "400px",
		height: "600px",
		position: "absolute",
		overflowY: "scroll",
		"&::-webkit-scrollbar": {
			display: "none",
		},
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	pageTitle: {
		position: "absolute",
		left: "0",
		top: "0",
		margin: "20px",
		fontSize: "25px",
	},
	topWrapper: {
		marginBottom: "70px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	bottomWrapper: {
		marginTop: "40px",
	},
})
