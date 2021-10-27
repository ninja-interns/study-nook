import { Grid, makeStyles, Container } from "@material-ui/core"
import { NavBar } from "../components/NavBar"
import { LeftBar } from "../components/LeftBar"
import { UserListGrid } from "../components/UserListGrid"

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(10),
	},
}))

const Analytics = () => {
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

export { Analytics }
