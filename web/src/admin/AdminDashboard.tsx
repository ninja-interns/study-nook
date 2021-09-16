import { Grid } from "@material-ui/core"
import NavBar from "./NavBar"
import LeftBar from "./LeftBar"
import Feed from "./Feed"

const AdminDashboard = () => {
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

export default AdminDashboard
