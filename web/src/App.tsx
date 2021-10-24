import { ContextContainer } from "./contexts/ContextContainer"
import Routes from "./routes/Routes"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme"
import { DomainContainer } from "./contexts/DomainContext"

function App() {
	return (
		<ContextContainer.Provider>
			<DomainContainer.Provider>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Routes />
				</ThemeProvider>
			</DomainContainer.Provider>
		</ContextContainer.Provider>
	)
}

export default App
