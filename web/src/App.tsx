import React from "react";
<<<<<<< HEAD
import Routes from "./Routes";
import { Route } from "react-router";
import { ProfilePage } from "./pages";


function App() {
	return (
		<div>
			<ProfilePage />
		</div>
=======
import { AuthContainer } from "./containers/AuthContainer";
import Routes from "./routes/Routes";

function App() {
	return (
		<AuthContainer.Provider>
			<Routes />
		</AuthContainer.Provider>
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048
	);
}
export default App;
