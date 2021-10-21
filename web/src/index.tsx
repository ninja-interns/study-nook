import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./theme"

let scheme = "http"
let domain = "localhost:8080"

if (process.env.NODE_ENV === "production") {
	scheme = "https"
	domain = "${studynook.xyz}"
}

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
