import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

interface PrivateRouteI {
	component: React.FC;
	path: string;
}

export function PrivateRoute({ component: Component, path }: PrivateRouteI) {
	const { isLoggedIn } = useAuth();
	return (
		<Route
			render={(props) => {
				return isLoggedIn ? <Route path={path} component={Component} /> : <Redirect to="/login" />;
			}}
		></Route>
	);
}
