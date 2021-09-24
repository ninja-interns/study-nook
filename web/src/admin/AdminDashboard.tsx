import { Container, Grid, makeStyles } from "@material-ui/core";
import { LeftBar } from "./LeftBar";
import { NavBar } from "./NavBar";
import { UserListGrid } from "./UserListGrid";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(10),
	},
}));

const AdminDashboard = () => {
	const classes = useStyles();
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
	);
};

export { AdminDashboard };
