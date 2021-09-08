<<<<<<< HEAD
import React from "react"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { HomePage, RegisterPage, LoginPage, Dashboard, Profile, EmailVerificationPage } from "../pages"
import { PrivateRoute } from "./PrivateRoute"
import AdminDashboard from "../admin/AdminDashboard"
=======
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
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import { UpdatePassword } from "./../pages/updatePassword/index";
import { LastLocationProvider } from "react-router-last-location";
>>>>>>> d2b5e9b056b859125bc141a27c27ed87a2ea864c

const Routes = () => {
	return (
		<Router>
<<<<<<< HEAD
			<Switch>
				<Route path="/registration" component={RegisterPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/verifyEmail" component={EmailVerificationPage} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/profile" component={Profile} />
				<Route exact path="/" component={HomePage} />

				<Route exact path="/admin" component={AdminDashboard} />
			</Switch>
=======
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
					<Route path="/" component={HomePage} />
				</Switch>
			</LastLocationProvider>
>>>>>>> d2b5e9b056b859125bc141a27c27ed87a2ea864c
		</Router>
	)
}

export default Routes
