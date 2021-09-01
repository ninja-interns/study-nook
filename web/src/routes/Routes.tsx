import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { HomePage, RegisterPage, LoginPage, Dashboard, Profile, EmailVerificationPage, UpdateUser } from "../pages";
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
				<PrivateRoute path="/profile" component={Profile} />
				<PrivateRoute path="/updateUser" component={UpdateUser} />
				<PrivateRoute path="/updatePassword" component={UpdatePassword} />
				<Route path="/" component={HomePage} />
			</Switch>
		</Router>
	);
};

export default Routes;
