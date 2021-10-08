import Routes from "./routes/Routes"
import { ContextContainer } from "./contexts/ContextContainer"
import { Nooking } from "./pages/nooking"
import { HomePage, NookingSetup } from "./pages"
import React from "react"
import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material"
import getDesignTokens from "./theme/getDesignTokens"
import { ThemeInterface } from "./theme/interfaces"
import { DarkThemeButton } from "./theme"

function App() {
	// const [mode, setMode] = React.useState<"light" | "dark">("light")

	// Initialize button with user's preferred color
	// let darkMode = document.getElementById("root")

	// chrome.storage.local.get(["key"], function (result) {
	// 	console.log("Value currently is " + result.key)
	// 	if (result.key === true) {
	// 		setMode("dark")
	// 	}
	// })

	// Update the theme only if the mode changes
	// const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

	return (
		<ContextContainer.Provider>
			{/* <ThemeProvider theme={theme}> */}
			{/* <CssBaseline /> */}
			{/* <Routes /> */}
			{/* <Nooking /> */}
			{/* <NookingSetup /> */}
			{/* <HomePage /> */}
			{/* </ThemeProvider> */}
			<DarkThemeButton />
		</ContextContainer.Provider>
	)
}

export default App
