import { makeStyles } from "@material-ui/styles"
import { keyframes } from "@mui/styled-engine"
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
		maxWidth: "fit-content",
		"&:hover": {
			fontSize: "30px",
			animationPlayState: "paused",
			WebkitMaskImage: "none",
		},
		WebkitMaskImage: "linear-gradient(-150deg, rgba(0,0,0,.6) 30%, #000 50%, rgba(0,0,0,.6) 70%)",
		WebkitMaskSize: "200%",

		animation: "$shine 2s linear infinite",
	},
	"@keyframes shine": {
		"0%": {
			WebkitMaskPosition: "150%",
		},
		"100%": {
			WebkitMaskPosition: "-50%",
		},
	},
})
