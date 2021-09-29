import * as React from "react"
import Timer from "../../components/countdownTimer/timer/index"
import TodoList from "../../components/todoList/list"
import ExamplePixi from "../../pixi/example"
import { useHistory } from "react-router-dom"
// Import Material UI
import { Box, Toolbar, Typography, createTheme, ThemeProvider, useTheme, IconButton, AppBar, Menu, MenuItem } from "@mui/material"
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Menu as MenuIcon } from "@mui/icons-material"

/**
 * * NOOKING PAGE
 * * This is the page of the app where the user is studying / working
 * * It diaplays the timer and todo items that they created on the nooking setup page
 */
const ColorModeContext = React.createContext({ toggleColorMode: () => {} }) // Toggles dark / light mode
const NookingPage = () => {
	const history = useHistory() // user route history

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
		const response = await fetch("/api/deleteTimer")
		if (!response.ok) {
			console.error("Error deleting timer: " + response.statusText)
		}
		history.push("/dashboard")
	}

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
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						id="menu-button"
						aria-controls="basic-menu"
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "menu-button",
						}}
					>
						<MenuItem onClick={handleStopNooking}>Stop Nooking</MenuItem>
					</Menu>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Nooking
					</Typography>
					<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit" edge="end">
						{theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
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
