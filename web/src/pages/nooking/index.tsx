// Import Dependencies
import * as React from "react"
import ExamplePixi from "../../pixi/example"
// Import Components
import Timer from "../../components/countdownTimer/timer/index"
import TodoList from "../../components/todoList/list"
// Import Material UI
import { Box, Toolbar, Typography, createTheme, ThemeProvider, useTheme } from "@mui/material"
import { IconButton, AppBar } from "@mui/material"
import { Brightness4, Brightness7, Menu } from "@mui/icons-material"

/**
 * * NOOKING PAGE
 * * This is the page of the app where the user is studying / working
 * * It diaplays the timer and todo items that they created on the nooking setup page
 */
const ColorModeContext = React.createContext({ toggleColorMode: () => {} }) // Toggles dark / light mode
const NookingPage = () => {
	const theme = useTheme()
	const colorMode = React.useContext(ColorModeContext)

	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",
				padding: 1,
				bgcolor: "background.default",
				color: "text.primary",
			}}
		>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<Menu />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Nooking
					</Typography>
					<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit" edge="end">
						{theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box>
				<ExamplePixi />
			</Box>
			<Timer />
			<TodoList />
		</Box>
	)
}

//* This function gives the page a light / dark mode toggle component
export function Nooking() {
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
				<NookingPage />
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}
