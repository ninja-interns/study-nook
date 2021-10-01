import Routes from "./routes/Routes"
import { ContextContainer } from "./contexts/ContextContainer"
import CssBaseline from "@mui/material/CssBaseline"

function App() {
	return (
		<ContextContainer.Provider>
			<CssBaseline />
			<Routes />
		</ContextContainer.Provider>
	)
}

export default App
