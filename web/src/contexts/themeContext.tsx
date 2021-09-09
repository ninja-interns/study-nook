import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#86bbbd",
		},
		secondary: {
			main: "#A1CDA8",
		},

		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
	typography: {
		h1: {
			fontSize: "4rem",
		},
		h2: {
			fontSize: "3rem",
		},
		h3: {
			fontSize: "2.5rem",
		},
		h4: {
			fontSize: "2rem",
		},
		h5: {
			fontSize: "1.5rem",
		},
		h6: {
			fontSize: "1.4rem",
			fontWeight: "lighter",
		},
	},
});
