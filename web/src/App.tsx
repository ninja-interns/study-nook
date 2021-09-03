import React from "react";
import { AuthContainer } from "./contexts/AuthContainer";
import Routes from "./routes/Routes";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./contexts/themeContext";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<AuthContainer.Provider>
				<Routes />
			</AuthContainer.Provider>
		</ThemeProvider>
	);
}
export default App;
