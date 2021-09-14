import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
	container: {
		minWidth: "45%",
		margin: ".2rem",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		padding: ".2rem",
	},
	media: {},
	level: {
		display: "flex",
		justifyContent: "space-between",
	},
	button: {
		width: "100%",
	},
	title: {
		textAlign: "center",
	},
});
