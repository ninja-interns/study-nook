import { PaletteMode } from "@mui/material"
import { amber, grey } from "@mui/material/colors"

const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === "light"
			? {
					// palette values for light mode
					primary: {
						main: "#d4a49b",
						dark: "#a2756d",
						light: "#ffd5cc",
					},
					secondary: {
						main: "#9bcbd4",
						dark: "#6b9aa3",
						light: "#cdfeff",
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: "#d4a49b",
						dark: "#a2756d",
						light: "#ffd5cc",
					},
					secondary: {
						main: "#9bcbd4",
						dark: "#6b9aa3",
						light: "#cdfeff",
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
