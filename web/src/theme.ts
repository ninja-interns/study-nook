import { createTheme } from "@mui/material/styles"

// A custom theme for this app
const theme = createTheme({
	components: {
		MuiButton: {
			defaultProps: {
				style: {
					// Style 1
					borderBottomLeftRadius: "12px",
					borderBottomRightRadius: "4px",
					borderTopLeftRadius: "4px",
					borderTopRightRadius: "12px",
					//Style 2
				},
			},
		},
		MuiFab: {
			defaultProps: {
				style: {},
			},
		},
	},
})

export default theme
