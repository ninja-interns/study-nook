import { Container, makeStyles } from "@material-ui/core"
import Users from "./Users"
import { BrowserRouter as Router, Route, useRouteMatch } from "react-router-dom"
import CreateUserForm from "./CreateUserForm"

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(10),
	},
}))

export default function Feed() {
	const classes = useStyles()
	const { path, url } = useRouteMatch()
	return (
		<div>
			<Route exact path={`${path}`}>
				<Container className={classes.container}>
					<Users />
				</Container>
			</Route>
			<Route path={`${path}/users/create`}>
				<Container className={classes.container}>
					<CreateUserForm />
				</Container>
			</Route>
			<Route path={`${path}/users/edit/:userID`}>
				<Container className={classes.container}>
					<CreateUserForm />
				</Container>
			</Route>
			<Route path={`${path}/users/delete/:userID`}>
				<Container className={classes.container}>
					<CreateUserForm />
				</Container>
			</Route>
		</div>
	)
}
