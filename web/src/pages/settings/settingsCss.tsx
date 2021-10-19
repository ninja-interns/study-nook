import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	container: {
		width: "400px",
		height: "600px",
		position: "absolute",
		border: "solid black",
		backgroundColor: "white",
		WebkitFontSmoothing: "antialiased",
		MozOsxFontSmoothing: "grayscale",
	},
	closeButton: {
		width: "40px",
		position: "absolute",
		top: "0px",
		right: "0px",
		margin: "20px",
		cursor: "pointer",
	},
	option: {
		maxWidth: "fit-content",
		margin: "30px",
		marginLeft: "40px",
		fontSize: "25px",
		cursor: "pointer",
		marginBottom: "60px",
		"&:hover": {
			fontSize: "28px",
		},
	},
	optionsContainer: {
		marginTop: "70px",
	},
})
