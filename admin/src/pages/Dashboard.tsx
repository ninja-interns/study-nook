import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import { UserListGrid } from "../components/UserListGrid"
import { NavBar } from "../components/NavBar"
import { LeftBar } from "../components/LeftBar"

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(10),
	},
}))

const Dashboard = () => {
	const classes = useStyles()
	return (
		<div>
			<CssBaseline />
			<NavBar />
			<Grid container>
				<Grid item sm={2} xs={2}>
					<LeftBar />
				</Grid>
				<Grid item sm={10} xs={10}>
					<Container className={classes.container} style={{ height: 650, width: "100%" }}>
						<UserListGrid />
					</Container>
				</Grid>
			</Grid>
		</div>
	)
}

export { Dashboard }
