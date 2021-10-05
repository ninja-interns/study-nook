import { PaletteMode } from "@mui/material"
import { amber, grey } from "@mui/material/colors"

const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === "light"
			? {
					// palette values for light mode
					primary: {
						main: "#fac7c2",
						dark: "#c69692",
						light: "#fffaf5",
					},
					secondary: {
						main: "#c2eae6",
						dark: "#91b8b4",
						light: "#f5ffff",
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: "#BB86FC",
						dark: "#3700B3",
					},
					secondary: {
						main: "#03DAC6",
					},
					background: {
						default: "#121212",
					},
					text: {
						primary: "#FFFFFF",
						secondary: grey[500],
					},
					error: {
						main: "#CF6679",
					},
			  }),
	},
})

export default getDesignTokens
