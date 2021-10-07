import Routes from "./routes/Routes"
import { ContextContainer } from "./contexts/ContextContainer"
import { Nooking } from "./pages/nooking"
import { HomePage, NookingSetup } from "./pages"
import React from "react"
import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material"
import getDesignTokens from "./theme/getDesignTokens"
import { ThemeInterface } from "./theme/interfaces"

function App() {
	const [mode, setMode] = React.useState<"light" | "dark">("dark")

	React.useEffect(() => {
		getTimeLeft()
		async function getTimeLeft() {
			// Sends request to the API to calculate and return time remaining on the timer
			const response = await fetch("http://localhost:8080/api/get_theme")
			if (response.ok) {
				const data: ThemeInterface = await response.json()
				if (data.darkTheme) {
					setMode("dark")
				}
				// setMode("light")
			}
		}
	}, [])

	// Update the theme only if the mode changes
	const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

	return (
		<ContextContainer.Provider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{/* <Routes /> */}
				{/* <Nooking /> */}
				{/* <NookingSetup /> */}
				<HomePage />
			</ThemeProvider>
		</ContextContainer.Provider>
	)
}

export default App
