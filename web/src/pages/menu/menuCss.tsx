import { makeStyles } from "@material-ui/styles"
import { theme } from "../../contexts/themeContext"

export const useStyles = makeStyles({
	container: {
		width: "400px",
		height: "600px",
		position: "absolute",
		border: "solid black",
		backgroundColor: theme.palette.primary.main,
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
		color: theme.palette.secondary.contrastText,
	},
})
