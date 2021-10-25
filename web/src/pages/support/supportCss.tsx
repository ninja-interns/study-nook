import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
	container: {
		width: "400px",
		height: "600px",
		position: "relative",
		overflowY: "scroll",
		"&::-webkit-scrollbar": {
			display: "none",
		},
	},
	pageTitle: {
		margin: "20px",
		fontSize: "30px",
	},
	userInfo: {
		margin: "20px",
		marginTop: "40px",
	},
	submitReportButton: {
		margin: "0 auto",
		display: "block",
		marginTop: "40px",
	},
	textArea: {
		marginLeft: "20px",
		width: "360px",
		padding: "10px",
		borderRadius: "5%",
	},
	popUpBody: {
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
	popUpTitle: {
		textAlign: "center",
	},
	popUpContent: {
		fontSize: "17px",
		margin: "5px",
	},
	buttonsClass: {
		paddingTop: "90px",
		display: "flex",
		justifyContent: "space-evenly",
	},
})
