// Import Dependencies
import React from "react"
import {useHistory} from "react-router-dom"
// Import Material UI
import {
  Box,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  useTheme,
  Button,
} from "@mui/material"
import {IconButton, AppBar} from "@mui/material"
import {Brightness4, Brightness7, Menu} from "@mui/icons-material"
// Import Components
import TimerForm from "../../components/countdownTimer/form"
import TodoListApp from "../../components/todoList/form"

/**
 * * NOOKING SETUP PAGE
 * * This is the page of the app where the user sets up their todo list and timer duration
 * * The timer will not be created until the user clicks the "Start Nooking" button
 */
const ColorModeContext = React.createContext({toggleColorMode: () => {}}) // Toggles dark / light mode
const NookingSetupPage = () => {
  const history = useHistory() // routes history
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        padding: 1,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Nooking Setup
          </Typography>
          <IconButton
            sx={{ml: 1}}
            onClick={colorMode.toggleColorMode}
            color="inherit"
            edge="end"
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <TimerForm />
      <TodoListApp />
      <Button onClick={() => history.push("/nooking")}>Start Nooking</Button>
    </Box>
  )
}

//* This function gives the page a light / dark mode toggle component
export function NookingSetup() {
  const [mode, setMode] = React.useState<"light" | "dark">("light")
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    [],
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <NookingSetupPage />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
