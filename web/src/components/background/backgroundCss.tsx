import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	optionWrapper: {
		marginBottom: "10px",
		display: "flex",
		flexDirection: "column",
	},
	svgBox: {
		width: "350px",
		height: "200px",
		border: "solid black",
		margin: "20px",
		borderWidth: "1px",
		backgroundSize: "350px 200px",
		display: "block",
	},
	selectButton: {
		width: "80px",
		alignSelf: "flex-end",
		right: "20px",
	},
})
