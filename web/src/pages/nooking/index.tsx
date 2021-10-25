import * as React from "react"
import { Timer } from "../../components/countdownTimer/timer/index"
import { TodoList } from "../../components/todoList/list"
import { useHistory } from "react-router-dom"
import { Box, Toolbar, Typography, createTheme, ThemeProvider, useTheme, IconButton, AppBar, Menu, MenuItem } from "@mui/material"
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Menu as MenuIcon } from "@mui/icons-material"
import { DomainContainer } from "../../contexts/DomainContext"
import NavigationBar from "../../components/bottomNavigation"

/**
 * * NOOKING PAGE
 * * This is the page of the app where the user is studying / working
 * * It diaplays the timer and todo items that they created on the nooking setup page
 **/
const ColorModeContext = React.createContext({ toggleColorMode: () => {} }) // Toggles dark / light mode
const NookingPage = () => {
	const history = useHistory() // user route history
	const { url } = DomainContainer.useContainer()

	//* Theme
	const theme = useTheme()
	const colorMode = React.useContext(ColorModeContext)

	//* MUI Dropdown menu
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	//* Delete the timer and route the user to the dashboard
	async function handleStopNooking() {
		const response = await fetch(`${url}/api/delete_timer`)
		if (!response.ok) {
			console.error("Error deleting timer: " + response.statusText)
		}
		history.push("/dashboard")
	}

	return (
		<Box>
			<Timer />
			<TodoList />
			<NavigationBar />
		</Box>
	)
}

//* This function gives the page a light / dark mode toggle component
//? I am sure there is an easier / better way to implement light / dark theme
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
