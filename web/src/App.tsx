import Routes from "./routes/Routes"
import { ContextContainer } from "./contexts/ContextContainer"
import { Nooking } from "./pages/nooking"

function App() {
	return (
		<ContextContainer.Provider>
			{/* <Routes /> */}
			<Nooking />
		</ContextContainer.Provider>
	)
}

export default App
