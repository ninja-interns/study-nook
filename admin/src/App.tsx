import { ContextContainer } from "./contexts/ContextContainer"
import Routes from "./routes/Routes"
import CssBaseline from "@material-ui/core/CssBaseline"

function App() {
	return (
		<ContextContainer.Provider>
			<CssBaseline />
			<Routes />
		</ContextContainer.Provider>
	)
}

export default App
