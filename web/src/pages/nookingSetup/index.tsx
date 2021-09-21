import React from 'react'

// Material UI imports
import {Box, Button, Toolbar, Typography} from '@mui/material'
import {createTheme, ThemeProvider, useTheme} from '@mui/material/styles'
import {IconButton} from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import AppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'

// Component Imports
import TimerForm from '../../components/countdownTimer/form'
import TodoListApp from '../../components/todoList'
import {useGetState} from '../../utils/getState'
import {useHistory} from 'react-router-dom'

const ColorModeContext = React.createContext({toggleColorMode: () => {}})

const NookingSetupPage = () => {
  useGetState()
  const history = useHistory()
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        padding: 1,
        bgcolor: 'background.default',
        color: 'text.primary',
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
            <MenuIcon />
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
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <TimerForm />
      <TodoListApp />
      <Button onClick={() => history.push('/nooking')}>Start Nooking</Button>
    </Box>
  )
}

export function NookingSetup() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
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
