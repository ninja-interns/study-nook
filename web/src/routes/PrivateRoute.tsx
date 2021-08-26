import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContainer } from "../containers/AuthContainer";

interface IPrivateRouteProps {
	component: React.FC;
	path: string;
}

//A component that will check if the user is logged in (see AuthProvider), and if true, route them to the desired path and component or redirect them to the login page
export function PrivateRoute({ component: Component, path }: IPrivateRouteProps) {
	const { isLoggedIn } = AuthContainer.useContainer();
	return (
		<Route
			render={() => {
				return isLoggedIn ? <Route path={path} component={Component} /> : <Redirect to="/login" />;
			}}
		></Route>
	);
}
