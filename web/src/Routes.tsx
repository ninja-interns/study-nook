import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { HomePage, RegisterPage, LoginPage } from "./pages";
import { createMemoryHistory } from "history";

const Routes = () => {
	//const history = createMemoryHistory();

	return (
		<Router>
			<Switch>
				<Route path="/registration" component={RegisterPage} />
				<Route path="/login" component={LoginPage} />
				<Route exact path="/" component={HomePage} />
			</Switch>
		</Router>
	);
};

export default Routes;
