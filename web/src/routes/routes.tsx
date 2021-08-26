import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { HomePage, RegisterPage, LoginPage, Dashboard, Profile, ForgetPasswordPage, ChangePasswordPage, MenuPage, SupportPage } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/registration" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/forgetpassword" component={ForgetPasswordPage} />
                <Route path="/changepassword" component={ChangePasswordPage} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/menu" component={MenuPage} />
                <PrivateRoute path="/support" component={SupportPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </Router>
    );
};

export default Routes;