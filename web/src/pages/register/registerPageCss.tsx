import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		display: "flex",
		flexDirection: "column",
	},
	verticalCenter: {
		width: "200px",
		height: "300px",
		position: "fixed",
		top: "0",
		bottom: "0",
		left: "0",
		right: "0",
		margin: "auto",
	},
});
