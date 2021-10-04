import Routes from "./routes/Routes"
import { ContextContainer } from "./contexts/ContextContainer"

function App() {
	return (
		<ContextContainer.Provider>
			<Routes />
		</ContextContainer.Provider>
	)
}

export default App
