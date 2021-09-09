import Routes from "./Routes";
import { ThemeProvider } from "@material-ui/styles";
import { ContextContainer } from "./contexts/ContextContainer";
import { theme } from "./contexts/themeContext";


function App() {
	return (
		<ThemeProvider theme={theme}>
				<ContextContainer.Provider>
					<Routes />
				</ContextContainer.Provider>
		</ThemeProvider>
	);
}
export default App;
