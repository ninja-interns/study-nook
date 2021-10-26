import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
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
})
