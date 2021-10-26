import { Grid, makeStyles, Container } from "@material-ui/core"
import { NavBar } from "./NavBar"
import { LeftBar } from "./LeftBar"
import { UserListGrid } from "./UserListGrid"

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(10),
	},
}))

const AnalyticsPage = () => {
	const classes = useStyles()
	return (
		<div>
			<NavBar />
			<Grid container>
				<Grid item sm={2} xs={2}>
					<LeftBar />
				</Grid>
				<Grid item sm={10} xs={10}>
					<Container className={classes.container}>
						<UserListGrid />
					</Container>
				</Grid>
			</Grid>
		</div>
	)
}

export { AnalyticsPage }
