import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	container: {
		width: "400px",
		height: "600px",
		position: "absolute",
		WebkitFontSmoothing: "antialiased",
		MozOsxFontSmoothing: "grayscale",
		overflowY: "scroll",
		"&::-webkit-scrollbar": {
			display: "none",
		},
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
