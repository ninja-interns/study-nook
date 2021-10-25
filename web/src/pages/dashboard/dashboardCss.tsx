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
})
