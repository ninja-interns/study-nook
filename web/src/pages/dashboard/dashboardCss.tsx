import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	container: {
		width: "400px",
		height: "600px",
		position: "relative",
		border: "solid black",
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
	username: {
		position: "absolute",
		margin: "25px",
		top: "0px",
		right: "0px",
		fontFamily: "arial",
		fontSize: "17px",
		textTransform: "uppercase",
	},
	levelItems: {
		margin: "25px",
		position: "absolute",
		top: "50px",
		right: "0px",
	},
	levelWrapper: {
		display: "flex",
		alignItems: "center",
		justifyXContent: "center",
		flexDirection: "row",
	},
	levelIcon: {
		float: "left",
		width: "35px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	star: {
		width: "35px",
	},
	levelNumber: {
		position: "absolute",
		fontSize: "12px",
		marginTop: "3px",
	},
	levelBar: {},
	coinsWrapper: {
		position: "absolute",
		margin: "25px",
		right: "5",
		top: "100px",
		flexDirection: "row",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	coinsIcon: {
		width: "30px",
		float: "left",
		marginRight: "10px",
	},
	coinsNumber: {
		float: "right",
		fontSize: "18px",
	},
})
