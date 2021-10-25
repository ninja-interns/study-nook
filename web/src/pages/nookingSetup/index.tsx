import React from "react"
import { TimerForm } from "../../components/countdownTimer/form"
import { TodoListApp } from "../../components/todoList/form"
import { useHistory } from "react-router-dom"
import { Box, Toolbar, Typography, createTheme, ThemeProvider, useTheme, Button } from "@mui/material"
import { IconButton, AppBar } from "@mui/material"
import { Brightness4, Brightness7, Menu } from "@mui/icons-material"
import NavigationBar from "../../components/bottomNavigation"

/**
 * * NOOKING SETUP PAGE
 * * This is the page of the app where the user sets up their todo list and timer duration
 * * The timer will not be created until the user clicks the "Start Nooking" button
 **/
const ColorModeContext = React.createContext({ toggleColorMode: () => {} }) // Toggles dark / light mode
const NookingSetupPage = () => {
	const history = useHistory() // routes history
	const theme = useTheme()
	const colorMode = React.useContext(ColorModeContext)

	return (
		<Box>
			<TimerForm />
			<TodoListApp />
			<Button onClick={() => history.push("/nooking")}>Start Nooking</Button>
			<NavigationBar />
		</Box>
	)
}

//* This function gives the page a light / dark mode toggle component
//? I am sure there is an easier / better way to implement light / dark theme
export function NookingSetup() {
	const [mode, setMode] = React.useState<"light" | "dark">("light")
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
			},
		}),
		[],
	)

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode],
	)

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<NookingSetupPage />
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}
