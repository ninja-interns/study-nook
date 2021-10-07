import { createTheme, CssBaseline, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography, useTheme, AppBar } from "@mui/material"
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon, Menu as MenuIcon } from "@mui/icons-material"
import React from "react"
import getDesignTokens from "../../theme/getDesignTokens"

const ColorModeContext = React.createContext({ toggleColorMode: () => {} }) // Toggles dark / light mode

const AppBarToggle = () => {
	//* MUI Theme
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

	return (
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
					<MenuItem>Menu</MenuItem>
				</Menu>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					{/* Pass in props for the title */}
					Home
				</Typography>
				<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit" edge="end">
					{theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}

export function AppBarComponent() {
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
				<AppBarToggle />
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}
