import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	modal: {
		display: "flex",
		justifyContent: "center",
	},
	body: {
		width: "300px",
		height: "300px",
		position: "absolute",
		border: "1px solid #000",
		borderRadius: "5%",
		backgroundColor: "white",
		top: "0",
		bottom: "0",
		left: "0",
		right: "0",
		margin: "auto",
	},
	option: {
		maxWidth: "fit-content",
		margin: "30px",
		marginLeft: "40px",
		fontSize: "25px",
		cursor: "pointer",
		marginBottom: "60px",
		"&:hover": {
			fontSize: "28px",
		},
	},
})
