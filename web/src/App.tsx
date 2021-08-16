import React from "react";
import { HomePage, RegistrationPage } from "./pages";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

function App() {
	return (
		<div className="App">
			<HomePage />
		</div>
	);
}

export default App;
