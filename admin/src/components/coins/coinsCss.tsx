import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
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
		fontWeight: "bolder",
	},
})
