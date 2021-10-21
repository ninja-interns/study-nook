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
	},
	closeButton: {
		width: "40px",
		position: "absolute",
		top: "0px",
		right: "0px",
		margin: "20px",
		cursor: "pointer",
	},
	options: {
		display: "flex",
		flex: "colunmn",
		marginLeft: "40px",
		fontSize: "25px",
		marginTop: "60px",
		cursor: "pointer",
		maxWidth: "fit-content",
		paddin: "12px 48px",
		"&:hover": {
			fontSize: "30px",
			animationPlayState: "paused",
			WebkitMaskImage: "none",
		},
	},
})
