import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
	container: {
		padding: ".2rem",
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
	},
	level: {
		display: "flex",
		justifyContent: "space-between",
	},
	placeholder: {
		display: "flex",
		width: "100%",
		height: "40%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ebedf0",
	},
	soon: {
		fontWeight: "lighter",
	},
});
