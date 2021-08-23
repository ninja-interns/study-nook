import React from "react";
import { Redirect, Route } from "react-router-dom";

interface PrivateRouteI {
	component: React.FC;
	path: string;
}

export function PrivateRoute({ component: Component, path }: PrivateRouteI) {
	const isLoggedIn = document.cookie.includes("session");
	return (
		<Route
			render={() => {
				return isLoggedIn ? <Route path={path} component={Component} /> : <Redirect to="/login" />;
			}}
		></Route>
	);
}
