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
import { AdminEdit } from "../pages/AdminEdit"
import { AdminCreate } from "../pages/AdminCreate"
import { AdminList } from "../pages/AdminList"

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

					<PrivateRoute path="/admins-create" component={AdminCreate} />
					<PrivateRoute path="/admins-edit/:adminID" component={AdminEdit} />
					<PrivateRoute path="/admins" component={AdminList} />
					<Route component={ContentNotFound}></Route>
				</Switch>
			</LastLocationProvider>
		</Router>
	)
}

export default Routes
