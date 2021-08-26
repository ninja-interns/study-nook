import React from "react";
import { AuthContainer } from "./containers/AuthContainer";
import Routes from "./routes/Routes";

function App() {
	return (
		<AuthContainer.Provider>
			<Routes />
		</AuthContainer.Provider>
	);
}
export default App;
