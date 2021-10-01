import { PaletteMode } from "@mui/material"
import { amber, grey } from "@mui/material/colors"

const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === "light"
			? {
					// palette values for light mode
					primary: {
						main: "#6200EE",
						dark: "#3700B3",
						light: "#BB86FC",
					},
					secondary: {
						main: "#03DAC6",
						dark: "#018786",
					},
					divider: amber[200],
					text: {
						primary: grey[900],
						secondary: grey[800],
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
