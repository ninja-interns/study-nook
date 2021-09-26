import { ContextContainer } from "./contexts/ContextContainer"
import Routes from "./routes/Routes"

function App() {
	return (
		<ContextContainer.Provider>
			<Routes />
		</ContextContainer.Provider>
	)
}

//! OLD
// import { ThemeProvider } from "@material-ui/styles"
// import { theme } from "./contexts/themeContext"

// function App() {
// 	return (
// 		<ThemeProvider theme={theme}>
// 			<ContextContainer.Provider>
// 				<Routes />
// 			</ContextContainer.Provider>
// 		</ThemeProvider>
// 	)
// }

export default App
