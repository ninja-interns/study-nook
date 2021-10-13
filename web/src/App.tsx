import { ContextContainer } from "./contexts/ContextContainer"
import { Dashboard } from "./pages/dashboard"
import { NookingSetup } from "./pages/nookingSetup"
import Routes from "./routes/Routes"

function App() {
	return (
		<ContextContainer.Provider>
			<Routes />
		</ContextContainer.Provider>
	)
}

export default App
