import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { HomePage, RegisterPage, LoginPage, Dashboard } from "../pages";
import { createMemoryHistory } from "history";

const Routes = () => {
	//const history = createMemoryHistory();

	return (
		<Router>
			<Switch>
				<Route path="/registration" component={RegisterPage} />
				<Route path="/login" component={LoginPage} />
				<Route exact path="/" component={HomePage} />
				<Route path="/dashboard" component={Dashboard} />
			</Switch>
		</Router>
	);
};

export default Routes;
