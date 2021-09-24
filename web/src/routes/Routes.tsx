import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import {
	HomePage,
	RegisterPage,
	LoginPage,
	Dashboard,
	Profile,
	EmailVerificationPage,
	DeletedAccount,
	ForgotPassword,
	ResetPassword,
	Inventory,
	Shop,
	UpdateUser,
	UpdatePassword,
	MenuPage,
	AchievementsPage,
	SupportPage,
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import { LastLocationProvider } from "react-router-last-location";
import { AdminDashboard } from "../admin/AdminDashboard";
import { AdminLoginPage } from "../admin/AdminLoginPage";
import { UserCreatePage } from "../admin/UserCreatePage";
import { UserListPage } from "../admin/UserListPage";
import { AnalyticsPage } from "../admin/AnalyticsPage";
import { UserEditPage } from "../admin/UserEditPage";

const Routes = () => {
	return (
		<Router>
			<LastLocationProvider>
				<Switch>
					<Route path="/registration" component={RegisterPage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/verifyEmail" component={EmailVerificationPage} />
					<Route path="/deletedAccount" component={DeletedAccount} />
					<Route path="/forgotPassword" component={ForgotPassword} />
					<Route path="/resetPassword" component={ResetPassword} />
					<PrivateRoute path="/dashboard" component={Dashboard} />
					<PrivateRoute path="/shop" component={Shop} />
					<PrivateRoute path="/inventory" component={Inventory} />
					<PrivateRoute path="/profile" component={Profile} />
					<PrivateRoute path="/updateUser" component={UpdateUser} />
					<PrivateRoute path="/updatePassword" component={UpdatePassword} />
					<PrivateRoute path="/support" component={SupportPage} />
					<PrivateRoute path="/achievements" component={AchievementsPage} />
					<PrivateRoute path="/" component={MenuPage} />
					<Route exact path="/admin/dashboard">
						<AdminDashboard />
					</Route>
					<Route exact path="/admin/login">
						<AdminLoginPage />
					</Route>
					<Route exact path="/admin/users">
						<UserListPage />
					</Route>
					<Route exact path="/admin/users/create">
						<UserCreatePage />
					</Route>
					<Route path="/admin/users/:userID">
						<UserEditPage />
					</Route>

					<Route exact path="/admin/analytics">
						<AnalyticsPage />
					</Route>

					<Route exact path="/" component={HomePage} />
				</Switch>
			</LastLocationProvider>
		</Router>
	);
};

export default Routes;
