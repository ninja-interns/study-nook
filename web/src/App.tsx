<<<<<<< HEAD
import { ContextContainer } from "./contexts/ContextContainer";
import Routes from "./routes/Routes";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./contexts/themeContext";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<ContextContainer.Provider>
				<Routes />
			</ContextContainer.Provider>
		</ThemeProvider>
	);
=======
import { ContextContainer } from "./contexts/ContextContainer"
import Routes from "./routes/Routes"

function App() {
	return (
		<ContextContainer.Provider>
			<Routes />
		</ContextContainer.Provider>
	)
>>>>>>> 6dad207ced2f17e81351ab7e74a379f0d1e35872
}

export default App;
