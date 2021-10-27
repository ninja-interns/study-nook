import React from "react"
import { Redirect, Route } from "react-router-dom"
import { ContextContainer } from "../contexts/ContextContainer"

interface IPrivateRouteProps {
	component: React.FC
	path: string
}

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
