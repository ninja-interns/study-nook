import { Route, Switch, MemoryRouter as Router } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"
import { Dashboard } from "../pages/Dashboard"
import { LastLocationProvider } from "react-router-last-location"
import { Login } from "../pages/Login"
import { UserCreate } from "../pages/UserCreate"
import { UserList } from "../pages/UserList"
import { Analytics } from "../pages/Analytics"
import { UserEdit } from "../pages/UserEdit"
import { Home } from "../pages/Home"

const Routes = () => {
	return (
		<Router>
			<LastLocationProvider>
				<Switch>
					<Route path="/login" component={Login} />
					<PrivateRoute path="/dashboard" component={Dashboard} />
					<PrivateRoute path="/analytics" component={Analytics} />
					<PrivateRoute path="/users-create" component={UserCreate} />
					<PrivateRoute path="/users-edit/:userID" component={UserEdit} />
					<PrivateRoute path="/users" component={UserList} />

					<Route path="/" component={Home} />
				</Switch>
			</LastLocationProvider>
		</Router>
	)
}

export default Routes
