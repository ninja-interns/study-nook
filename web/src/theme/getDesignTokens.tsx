import { PaletteMode } from "@mui/material"

const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === "light"
			? {
					// palette values for light mode
					primary: {
						main: "#fedbd0",
						dark: "#caa99f",
						light: "#ffffff",
					},
					secondary: {
						main: "#feeae6",
						dark: "#cbb8b4",
						light: "#ffffff",
					},
					text: {
						primary: "#442C2E",
					},
			  }
			: {
					// palette values for dark mode
					// primary: {
					// 	main: "#d4a49b",
					// 	dark: "#a2756d",
					// 	light: "#ffd5cc",
					// },
					// secondary: {
					// 	main: "#9bcbd4",
					// 	dark: "#6b9aa3",
					// 	light: "#cdfeff",
					// },
					background: {
						default: "#121212",
					},
					error: {
						main: "#CF6679",
					},
			  }),
	},
})

export default getDesignTokens
