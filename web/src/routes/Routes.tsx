import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { HomePage, RegisterPage, LoginPage, Dashboard, ProfilePage } from "../pages";
import { EmailVerificationPage } from "../pages/emailVerification";
import { PrivateRoute } from "./PrivateRoute";
import { UpdatePassword } from "./../pages/updatePassword/index";

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route path="/registration" component={RegisterPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/verifyEmail" component={EmailVerificationPage} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/profile" component={ProfilePage} />
				<Route path="/" component={HomePage} />
			</Switch>
		</Router>
	)
}

export default Routes
