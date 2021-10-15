import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
	palette: {
		primary: {
			main: "#B6D1D1",
		},
		secondary: {
			main: "#eacbb4",
		},
		text: {
			primary: "#565B53",
		},
		// background: {
		// 	default: "#fafafa",

		// },
	},
	components: {
		MuiBottomNavigation: {
			defaultProps: {
				color: "primary",
			},
		},
	},
})
