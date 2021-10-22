import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	container: {
		width: "400px",
		height: "600px",
		position: "relative",
	},
	menuButton: {
		position: "absolute",
		margin: "20px",
		bottom: "0px",
		right: "0px",
	},
	startNookingButton: {
		position: "absolute",
		margin: "20px",
		top: "0px",
		left: "0px",
		fontSize: "13px",
	},
	changeBackgroundButton: {
		position: "absolute",
		right: "0",
		top: "214px",
		margin: "20px",
		fontSize: "12px",
	},
	changeAvatarButton: {
		position: "absolute",
		left: "0",
		top: "214px",
		margin: "20px",
		fontSize: "12px",
	},
	username: {
		position: "absolute",
		margin: "25px",
		top: "0px",
		right: "0px",
		fontFamily: "arial",
		fontSize: "17px",
		textTransform: "uppercase",
	},
})
