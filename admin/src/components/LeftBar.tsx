import { Container, makeStyles, Typography } from "@material-ui/core"
import { Group, Home, People, ShowChart } from "@material-ui/icons"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(10),
		backgroundColor: theme.palette.primary.main,
		height: "100vh",
		color: "white",
		postion: "sticky",
		top: 0,
		[theme.breakpoints.up("sm")]: {
			backgroundColor: "white",
			color: "#555",
			border: "1px solid #ece7e7",
		},
		left: 0,
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

const LeftBar = () => {
	const classes = useStyles()
	return (
		<Container className={classes.container}>
			<Link to="/dashboard" style={{ textDecoration: "none" }}>
				<div className={classes.item}>
					<Home className={classes.icon} />
					<Typography className={classes.text}>Home</Typography>
				</div>
			</Link>
			<Link to="/users" style={{ textDecoration: "none" }}>
				<div className={classes.item}>
					<Group className={classes.icon} />
					<Typography className={classes.text}>Users</Typography>
				</div>
			</Link>
			<Link to="/analytics" style={{ textDecoration: "none" }}>
				<div className={classes.item}>
					<ShowChart className={classes.icon} />
					<Typography className={classes.text}>Analytics</Typography>
				</div>
			</Link>
			<Link to="/admins" style={{ textDecoration: "none" }}>
				<div className={classes.item}>
					<People className={classes.icon} />
					<Typography className={classes.text}>Analytics</Typography>
				</div>
			</Link>
		</Container>
	)
}

export { LeftBar }
