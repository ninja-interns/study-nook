import * as React from "react"
import { IconButton } from "@mui/material"
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from "@mui/icons-material"
import { ThemeInterface } from "./interfaces"

const DarkThemeButton = () => {
	const [darkMode, setDarkMode] = React.useState<boolean>(true)

	//! Get and set the theme from database - runs once on render
	React.useEffect(() => {
		getTimeLeft()
		async function getTimeLeft() {
			// Sends request to the API to calculate and return time remaining on the timer
			const response = await fetch("http://localhost:8080/api/get_theme")
			if (response.ok) {
				const data: ThemeInterface = await response.json()
				if (data.darkTheme) {
					setDarkMode(true)
				}
			}
		}
	}, [])

	//! COMMENT
	const handleThemeToggle = () => {
		setDarkMode(!darkMode)

		// Set theme in the database
		const newTheme: ThemeInterface = {
			darkTheme: darkMode,
			userId: "",
		}
		setTheme(newTheme)
	}

	//! COMMENT
	async function setTheme(newTheme: ThemeInterface) {
		// Sends request to the API to set the extensions theme
		const response = await fetch("http://localhost:8080/api/set_theme", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(newTheme),
		})
		if (!response.ok) {
			console.error("Error setting theme: " + response.statusText)
		}

		//! Reload to show new theme
		// window.location.reload()
	}

	return (
		<IconButton sx={{ ml: 1 }} onClick={handleThemeToggle} color="inherit" edge="end">
			{darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
		</IconButton>
	)
}

export { DarkThemeButton }
