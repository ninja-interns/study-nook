import { Grid } from "@material-ui/core"
import { NavBar } from "./NavBar"
import { LeftBar } from "./LeftBar"
import { Feed } from "./Feed"
import { makeStyles, Container, CssBaseline } from "@material-ui/core"
import { UserListGrid } from "./UserListGrid"

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(10),
	},
}))

const AdminDashboard = () => {
	const classes = useStyles()
	return (
		<div>
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

export { AdminDashboard }
