import { makeStyles } from "@material-ui/styles"
import { Hidden } from "@mui/material"
import { keyframes } from "@mui/styled-engine"

export const useStyles = makeStyles({
	container: {
		width: "400px",
		height: "600px",
		position: "relative",
		overflowY: "scroll",
		"&::-webkit-scrollbar": {
			display: "none",
		},
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},
	creditsText: {
		textAlign: "center",
		margin: "60px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		animation: "$creditRoll 3s linear",
		animationDelay: "15s",
		position: "absolute",
		visibility: "hidden",
	},
	attributeText: {
		textAlign: "center",
		margin: "60px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		animation: "$creditRollStays 3s linear",
		animationDelay: "25s",
		animationFillMode: "forwards",
		WebkitAnimationFillMode: "forwards",
		OzAnimationFillMode: "forwards",
		position: "absolute",
		visibility: "hidden",
	},
	"@keyframes creditRoll": {
		"0%": {
			top: "600px",
			visibility: "visible",
		},
		"100%": {
			top: "150px",
			visibility: "visible",
		},
	},
	"@keyframes creditRollStays": {
		"0%": {
			top: "600px",
			visibility: "visible",
		},
		"100%": {
			top: "150px",
			visibility: "visible",
		},
	},
	text: {
		margin: "10px",
		fontWeight: "bolder",
		fontSize: "20px",
	},
	attributeFont: {
		margin: "10px",
		fontWeight: "bold",
		fontSize: "12px",
	},
	appName: {
		fontFamily: "Pacifico",
		fontSize: "45px",
		animation: "$fadeIn 5s linear",
		opacity: "0",
	},
	ninjaThanks: {
		position: "absolute",
		textAlign: "center",
		animation: "$fadeIn 10s linear",
		animationDelay: "5s",
		fontWeight: "bolder",
		fontSize: "20px",
		opacity: "0",
		margin: "60px",
	},
	"@keyframes fadeIn": {
		"0%": {
			opacity: "0",
		},
		"30%, 80%": {
			opacity: "1",
		},
		"100%": {
			opacity: "0",
		},
	},
})
