import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
	modal: {
		display: "flex",
		justifyContent: "center",
	},
	body: {
		textAlign: "center",
		position: "absolute",
		width: "250px",
		height: "200px",
		padding: "1rem",
		backgroundColor: "rgba(255,255,255,0.95)",
		border: "2px solid #000",
	},
});
