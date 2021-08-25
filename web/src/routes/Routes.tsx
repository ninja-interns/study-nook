import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { HomePage, RegisterPage, LoginPage, DashboardPage, ForgetPasswordPage, ChangePasswordPage, MenuPage, SupportPage } from "../pages";

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route path="/registration" component={RegisterPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/dashboard" component={DashboardPage} />
				<Route path="/forgetpassword" component={ForgetPasswordPage} />
				<Route path="/changepassword/*" component={ChangePasswordPage} />
				<Route path="/menu" component={MenuPage} />
				<Route path="/support" component={SupportPage} />
				<Route path="/" component={HomePage} />
			</Switch>
		</Router>
	);
};

export default Routes;
