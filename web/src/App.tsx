import React from 'react'
import {ContextContainer} from './contexts/ContextContainer'
import Routes from './routes/Routes'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  return (
    <ContextContainer.Provider>
      <ThemeProvider theme={theme}>
        <Routes />
        <CssBaseline />
      </ThemeProvider>
    </ContextContainer.Provider>
  )
}
export default App
