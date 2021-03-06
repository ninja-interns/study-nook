import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	container: {
		width: "400px",
		height: "600px",
		position: "absolute",
	},
	svgBox: {
		width: "350px",
		height: "200px",
		border: "solid black",
		position: "absolute",
		bottom: "100px",
		margin: "25px",
		borderWidth: "1px",
		backgroundSize: "350px 200px",
		display: "block",
	},
	svgCharacter: {
		width: "80",
		height: "120",
		position: "relative",
		display: "block",
		left: "120px",
		top: "70px",
		bottom: "0px",
	},
})
