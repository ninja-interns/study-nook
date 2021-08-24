import React from "react";
import { useAuthContainer } from "./containers/AuthContainer";
import Routes from "./routes/Routes";

function App() {
	return (
		<useAuthContainer.Provider>
			<Routes />
		</useAuthContainer.Provider>
	);
}
export default App;
