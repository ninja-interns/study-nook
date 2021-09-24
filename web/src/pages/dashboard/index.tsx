import { Button, Fade, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { DeleteAccount, Logout } from "../../components";
import { ContextContainer } from "../../contexts/ContextContainer";
import { useGetState } from "./../../utils/getState";

export function Dashboard() {
	useGetState();
	const { currentUser } = ContextContainer.useContainer();
	const history = useHistory();

	return (
		<Fade in={true} timeout={1000}>
			<div>
				<DeleteAccount />
				<Typography variant="body1">Welcome to your StudyNook Dashboard, {currentUser.name}!</Typography>
				<Button onClick={() => history.push("/profile")}>Profile</Button>
				<Link to="/updateUser">Update User</Link>
				<Link to="/updatePassword">Update Password</Link>
				<Button onClick={() => history.push("/menu")}>Menu</Button>
			</div>
		</Fade>
	);
}
