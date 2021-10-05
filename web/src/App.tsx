import { ContextContainer } from "./contexts/ContextContainer"
import Routes from "./routes/Routes"

function App() {
	return (
		<ContextContainer.Provider>
			<Routes />
		</ContextContainer.Provider>
	)
}

export default App
