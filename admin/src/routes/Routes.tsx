import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"
import { Dashboard } from "../pages/Dashboard"
import { LastLocationProvider } from "react-router-last-location"
import { Login } from "../pages/Login"
import { UserCreate } from "../pages/UserCreate"
import { UserList } from "../pages/UserList"
import { Analytics } from "../pages/Analytics"
import { UserEdit } from "../pages/UserEdit"
import { Home } from "../pages/Home"
import { ContentNotFound } from "../pages/ContentNotFound"

const Routes = () => {
	return (
		<Router>
			<LastLocationProvider>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<PrivateRoute path="/dashboard" component={Dashboard} />
					<PrivateRoute path="/analytics" component={Analytics} />
					<PrivateRoute path="/users-create" component={UserCreate} />
					<PrivateRoute path="/users-edit/:userID" component={UserEdit} />
					<PrivateRoute path="/users" component={UserList} />
					<Route component={ContentNotFound}></Route>
				</Switch>
			</LastLocationProvider>
		</Router>
	)
}

export default Routes
