import { Container, makeStyles, Typography } from "@material-ui/core"
import { Group, Home, ShowChart } from "@material-ui/icons"
import React from "react"

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(10),
		backgroundColor: theme.palette.primary.main,
		height: "100vh",
		color: "white",
		[theme.breakpoints.up("sm")]: {
			backgroundColor: "white",
			color: "#555",
			border: "1px solid #ece7e7",
		},
	},

	item: {
		display: "flex",
		alignItems: "center",
		marginBottom: theme.spacing(4),
		[theme.breakpoints.up("sm")]: {
			marginBottom: theme.spacing(3),
			cursor: "pointer",
		},
	},

	icon: {
		marginRight: theme.spacing(1),
		[theme.breakpoints.up("sm")]: {
			fontSize: "18px",
		},
	},

	text: {
		fontWeight: 500,
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
}))

function LeftBar() {
	const classes = useStyles()
	return (
		<Container className={classes.container}>
			<div className={classes.item}>
				<Home className={classes.icon} />
				<Typography className={classes.text}>Home</Typography>
			</div>
			<div className={classes.item}>
				<ShowChart className={classes.icon} />
				<Typography className={classes.text}>Analytics</Typography>
			</div>
			<div className={classes.item}>
				<Group className={classes.icon} />
				<Typography className={classes.text}>Users</Typography>
			</div>
		</Container>
	)
}

export default LeftBar
