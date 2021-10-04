import Routes from "./routes/Routes"
import { ContextContainer } from "./contexts/ContextContainer"
import CssBaseline from "@mui/material/CssBaseline"
import { Container, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material"
import React from "react"
import { createTheme } from "@mui/system"
import getDesignTokens from "./theme/getDesignTokens"

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

function App() {
	const [mode, setMode] = React.useState<PaletteMode>("light")
	const colorMode = React.useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode((prevMode: PaletteMode) => (prevMode === "light" ? "dark" : "light"))
			},
		}),
		[],
	)

	// Update the theme only if the mode changes
	const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

	return (
		<ContextContainer.Provider>
			<ColorModeContext.Provider value={colorMode}>
				{/* <ThemeProvider theme={theme}> */}
				<Container>
					<CssBaseline />
					<Routes />
				</Container>
				{/* </ThemeProvider> */}
			</ColorModeContext.Provider>
		</ContextContainer.Provider>
	)
}

export default App
