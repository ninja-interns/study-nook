import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import {
	HomePage,
	RegisterPage,
	LoginPage,
	Dashboard,
	Profile,
	EmailVerificationPage,
	UpdateUser,
	DeletedAccount,
	ForgotPassword,
	ResetPassword,
	MenuPage,
	SupportPage,
	AchievementsPage
} from "../pages";

import { PrivateRoute } from "./PrivateRoute";
import { UpdatePassword } from "./../pages/updatePassword/index";
import { LastLocationProvider } from "react-router-last-location";

const Routes = () => {
	return (
		<Router>
			<LastLocationProvider>
				<Switch>
					<Route path="/registration" component={RegisterPage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/verifyEmail" component={EmailVerificationPage} />
					<Route path="/deletedAccount" component={DeletedAccount} />
					<Route path="/forgotPassword" component={ForgotPassword} />
					<Route path="/resetPassword" component={ResetPassword} />
					<PrivateRoute path="/dashboard" component={Dashboard} />
					<PrivateRoute path="/profile" component={Profile} />
					<PrivateRoute path="/updateUser" component={UpdateUser} />
					<PrivateRoute path="/updatePassword" component={UpdatePassword} />
					<PrivateRoute path="/menu" component={MenuPage} />
					<PrivateRoute path="/support" component={SupportPage} />
					<PrivateRoute path="/achievements" component={AchievementsPage} />
					<Route path="/" component={HomePage} />
				</Switch>
			</LastLocationProvider>
		</Router>
	);
};

export default Routes;
