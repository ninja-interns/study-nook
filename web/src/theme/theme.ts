import { createTheme } from "@mui/material/styles"

// A custom theme for this app
const theme = createTheme({
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					width: 420,
					height: 560,
				},
			},
		},
	},
})

export default theme
