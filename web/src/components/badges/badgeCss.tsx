import { makeStyles } from "@material-ui/styles"
import { flexbox } from "@mui/system"

export const useStyles = makeStyles({
	achievementContainer: {
		display: "flex",
	},
	badgeElement: {
		width: "50px",
		margin: "20px",
		marginBottom: "10px",
		cursor: "pointer",
		"&:hover": {
			"& ~ $textBox": {
				display: "block",
			},
		},

		opacity: "1",
	},
	badgeElementLocked: {
		width: "50px",
		margin: "20px",
		marginBottom: "10px",
		cursor: "pointer",
		"&:hover": {
			"& ~ $textBox": {
				display: "block",
			},
		},
		opacity: 0.5,
		filter: "grayscale(100%)",
	},
	locker: {
		position: "absolute",
		width: "40px",
		margin: "25px",
		marginTop: "25px",
		cursor: "pointer",
		"&:hover": {
			"& ~ $textBox": {
				display: "block",
			},
		},
		opacity: "1",
		zIndex: 100,
	},
	badgeCaption: {
		textAlign: "center",
		marginRight: "5px",
		marginBottom: "20px",
		cursor: "pointer",
		"&:hover": {
			"& + $textBox": {
				display: "block",
			},
		},
	},
	textBox: {
		margin: "-70px",
		marginLeft: "-30px",
		background: "#F8F8F8",
		border: "1px solid black",
		color: "#717171",
		fontSize: "10px",
		height: "40px",
		width: "160px",
		letterSpacing: "1px",
		lineHeight: "20px",
		position: "absolute",
		textAlign: "left",
		textTransform: "uppercase",
		display: "none",
		padding: "3px",
		paddingLeft: "8px",
		paddingRight: "8px",
		pointerEvents: "none",
	},
	bar: {
		background: "#353b48",
		display: "block",
		height: "7px",
		border: "1px solid rgba(0,0,0, 0.3)",

		borderRadius: "10%",
		overflow: "hidden",
	},
	achievement: {},
	tracker: {
		float: "right",
	},
})
