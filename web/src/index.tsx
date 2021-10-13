import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import CssBaseline from "@mui/material/CssBaseline"
import { Container } from "@mui/material"
// import { ThemeProvider } from "@mui/material/styles"
// import theme from "./theme"

ReactDOM.render(
	<React.StrictMode>
		<Container
			sx={{
				width: 400,
				height: 600,
				p: 0,
				m: 0,
			}}
		>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<App />
		</Container>
	</React.StrictMode>,
	document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
