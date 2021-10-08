import * as React from "react"
import { IconButton } from "@mui/material"
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from "@mui/icons-material"
import { ThemeInterface } from "./interfaces"
import { MessageType } from "../types"

const DarkThemeButton = () => {
	const [darkMode, setDarkMode] = React.useState(false)

	return (
		<IconButton sx={{ ml: 1 }} onClick={onClick} color="inherit" edge="end">
			{darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
		</IconButton>
	)
}

export { DarkThemeButton }
