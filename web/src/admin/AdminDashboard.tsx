import { Grid, makeStyles } from "@material-ui/core"
import NavBar from "./NavBar"
import LeftBar from "./LeftBar"
import Feed from "./Feed"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	right: {
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
}))

export default function AdminDashboard() {
	const classes = useStyles()
	return (
		<div>
			<NavBar />
			<Grid container>
				<Grid item sm={2} xs={2}>
					<LeftBar />
				</Grid>
				<Grid item sm={10} xs={10}>
					<Feed />
				</Grid>
			</Grid>
		</div>
	)
}
