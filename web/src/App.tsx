import { ThemeProvider } from "@mui/material"
import { ContextContainer } from "./contexts/ContextContainer"
import { theme } from "./contexts/themeContext"
import Routes from "./routes/Routes"

function App() {
	return (
		<ContextContainer.Provider>
			<ThemeProvider theme={theme}>
				<Routes />
			</ThemeProvider>
		</ContextContainer.Provider>
	)
}

export default App
