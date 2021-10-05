import React from "react"
import { Redirect, Route } from "react-router-dom"
import { ContextContainer } from "../contexts/ContextContainer"

interface IPrivateRouteProps {
	component: React.FC
	path: string
}

//A component that will check if the user is logged in (see AuthProvider), and if true, route them to the desired path and component or redirect them to the login page
export function PrivateRoute({ component: Component, path }: IPrivateRouteProps) {
	const { isLoggedIn } = ContextContainer.useContainer()
	return (
		<Route
			render={() => {
				return isLoggedIn ? <Route path={path} component={Component} /> : <Redirect push to="/login" />
			}}
		></Route>
	)
}

export function AdminPrivateRoute({ component: Component, path }: IPrivateRouteProps) {
	const { isLoggedIn } = ContextContainer.useContainer()
	return (
		<Route
			render={() => {
				return isLoggedIn ? <Route path={path} component={Component} /> : <Redirect push to="/admin-login" />
			}}
		></Route>
	)
}
