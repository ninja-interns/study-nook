import { createTheme } from "@mui/material/styles"

// A custom theme for this app
const theme = createTheme({
	components: {
		MuiFab: {
			defaultProps: {
				style: {
					backgroundColor: "#ffd364", // yellow
				},
			},
		},
		MuiButton: {
			variants: [
				{
					props: { variant: "contained" },
					style: {
						fontcolor: "#fc7a5b",
						backgroundColor: "#ffd364", // yellow
						boxShadow: "rgb(136 136 255) 0px 0px 0px 2px inset, rgb(136 136 255) 4px 4px 0px 0px, rgb(136 136 255) 4px 4px",
						borderRadius: "0 0 0 0",

						":hover": {
							// backgroundColor: "#febf3b", // darker
							backgroundColor: "#ffd364",
							boxShadow: "rgb(136 136 255) 0px 0px 0px 2px inset, rgb(136 136 255) 0px 0px 0px 0px, rgb(136 136 255) 0px 0px",
						},
					},
				},
				{
					props: { variant: "outlined" },
					style: {},
				},
			],
			defaultProps: {
				style: {
					// Style 1
					// borderBottomLeftRadius: "12px",
					// borderBottomRightRadius: "4px",
					// borderTopLeftRadius: "4px",
					// borderTopRightRadius: "12px",
					// Style 1.2
					// boxShadow: "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;"
				},
			},
		},
		MuiBottomNavigation: {
			defaultProps: {
				style: {
					// backgroundColor: "#a8d0e6",
				},
			},
		},
	},
	palette: {
		background: {
			default: "#fff1ec", // light peach
		},
		primary: {
			main: "#8888ff", // purple
			contrastText: "#fc7a5b", // pink
		},
		secondary: {
			main: "#fc7a5b", //pink
		},
		text: {
			primary: "#8888ff", // purple
			secondary: "#fc7a5b", //pink
		},
	},
	typography: {
		fontFamily: ['"Nunito Sans"', "sans-serif"].join(","),
		button: {
			textTransform: "uppercase",
			fontWeight: 800,
		},
	},
})

export default theme

/**
 * 	MuiBottomNavigation: {
			defaultProps: {
				style: {
					backgroundColor: "#a8d0e6",
				},
			},
		},
	},
	palette: {
		mode: "dark",
		background: {
			default: "#a8d0e6",
		},
		primary: {
			main: "#24305e",
		},
		secondary: {
			main: "#f76c6c",
		},
	},
 */
