import React from "react"
import { TimerForm } from "../../components/countdownTimer/form"
import { TodoListApp } from "../../components/todoList/form"
import { useHistory } from "react-router-dom"
import { Toolbar, Typography, createTheme, ThemeProvider, useTheme, Button, Container, CssBaseline } from "@mui/material"
import { IconButton, AppBar } from "@mui/material"
import { Brightness4, Brightness7, Menu } from "@mui/icons-material"
import getDesignTokens from "../../theme/getDesignTokens"
import theme from "../../theme/theme"

//* GLOBAL VARIABLE - Toggles dark / light mode
const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

/**
 * * NOOKING SETUP PAGE
 * * This is the page of the app where the user sets up their todo list and timer duration
 * * The timer will not be created until the user clicks the "Start Nooking" button
 **/
const NookingSetupPage = () => {
	const colorTheme = useTheme()
	const colorMode = React.useContext(ColorModeContext) // Toggles colour mode
	const history = useHistory() // routes history

	return (
		<>
			<AppBar>
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						Nooking Setup
					</Typography>
					<IconButton onClick={colorMode.toggleColorMode} color="inherit" edge="end">
						{colorTheme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
				</Toolbar>
			</AppBar>
			<TimerForm />
			<TodoListApp />
			<Button onClick={() => history.push("/nooking")}>Start Nooking</Button>
		</>
	)
}

//* This function gives the page a light / dark mode toggle component
//? I am sure there is an easier / better way to implement light / dark theme
export function NookingSetup() {
	const [mode, setMode] = React.useState<"light" | "dark">("light")

	// The darkmode switch invokes this method
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
			},
		}),
		[],
	)

	// Update the theme only if the mode changes
	const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

	return <NookingSetupPage />
}
