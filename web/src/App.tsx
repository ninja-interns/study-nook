import React from "react";
import { ContextContainer } from "./contexts/ContextContainer";
import Routes from "./routes/Routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@material-ui/core";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <ContextContainer.Provider>
        <Routes />
      </ContextContainer.Provider>
      <CssBaseline />
    </ThemeProvider>
  );
}
export default App;
