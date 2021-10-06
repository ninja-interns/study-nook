import Routes from "./routes/Routes"
import { ContextContainer } from "./contexts/ContextContainer"
import { Nooking } from "./pages/nooking"
import { HomePage } from "./pages"

function App() {
	return (
		<ContextContainer.Provider>
			{/* <Routes /> */}
			{/* <Nooking /> */}
			<HomePage />
		</ContextContainer.Provider>
	)
}

export default App
