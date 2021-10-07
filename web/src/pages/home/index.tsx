import { ThemeProvider, useTheme } from "@mui/material"
import { Home } from "../../components"
import { AppBarComponent } from "../../components/appBar"
import { DarkThemeButton } from "../../theme"

export function HomePage() {
	const theme = useTheme()
	return (
		<ThemeProvider theme={theme}>
			{/* <AppBarComponent /> */}
			{/* Add UnDraw here */}
			<DarkThemeButton />
			<Home />
		</ThemeProvider>
	)
}
