import { createTheme } from "@mui/material/styles"

// A custom theme for this app
const theme = createTheme({
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					width: 380,
					height: 560,
					border: 1,
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					position: "static",
				},
			},
		},
	},
})

export default theme
