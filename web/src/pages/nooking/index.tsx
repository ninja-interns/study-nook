import { Global } from "@emotion/react"
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Menu as MenuIcon } from "@mui/icons-material"
import { AppBar, Box, createTheme, CssBaseline, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography, useTheme } from "@mui/material"
import Button from "@mui/material/Button"
import { grey } from "@mui/material/colors"
import Skeleton from "@mui/material/Skeleton"
import { styled } from "@mui/material/styles"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import * as React from "react"
import { useHistory } from "react-router-dom"
import { Timer } from "../../components/countdownTimer/timer/index"
import { TodoList } from "../../components/todoList/list"
import getDesignTokens from "../../theme/getDesignTokens"

/**
 * * NOOKING PAGE
 * * This is the page of the app where the user is studying / working
 * * It diaplays the timer and todo items that they created on the nooking setup page
 **/
const ColorModeContext = React.createContext({ toggleColorMode: () => {} }) // Toggles dark / light mode
const NookingPage = () => {
	const history = useHistory() // user route history

	//* Theme
	const theme = useTheme()
	const colorMode = React.useContext(ColorModeContext)

	//* Delete the timer and route the user to the dashboard
	async function handleStopNooking() {
		const response = await fetch("/api/delete_timer")
		if (!response.ok) {
			console.error("Error deleting timer: " + response.statusText)
		}
		history.push("/dashboard")
	}

	//* MUI Dropdown menu
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	//* MUI Drawer
	const [openDrawer, setOpenDrawer] = React.useState(false)

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpenDrawer(newOpen)
	}

	return (
		<>
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
			<Skeleton
				variant="rectangular"
				height="40%"
				sx={{
					m: 1,
				}}
			/>
			<Button onClick={toggleDrawer(true)}>Open</Button>
			<Timer />
			<Box width="100%" height="20%" id="drawer-container" position="relative" component="div">
				<Drawer
					// anchor="bottom"
					open={openDrawer}
					onClose={toggleDrawer(false)}
					PaperProps={{ style: { position: "absolute", width: "100%" } }}
					// BackdropProps={{ style: { position: "absolute" } }}
					ModalProps={{
						container: document.getElementById("drawer-container"),
						style: { position: "absolute" },
						keepMounted: true,
					}}
					SlideProps={{
						onExiting: (node) => {
							// node.style.webkitTransform = "scaleX(0)"
							node.style.transform = "scaleX(0)"
							node.style.transformOrigin = "bottom"
						},
					}}
				>
					<TodoList />
				</Drawer>
			</Box>
		</>
	)
}

//* This function gives the page a light / dark mode toggle component
//? I am sure there is an easier / better way to implement light / dark theme
export function Nooking() {
	const [mode, setMode] = React.useState<"light" | "dark">("light")
	const colorMode = React.useMemo(
		// The darkmode switch invokes this method
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
			},
		}),
		[],
	)

	// Update the theme only if the mode changes
	const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<NookingPage />
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}
