import {IconButton, Typography} from '@material-ui/core'
import * as React from 'react'
import {TimerInterface} from '../interfaces'
import {PlayArrow} from '@material-ui/icons'
// import { useStyles } from "../../../pages/nookingSetup/nookingSetupCss"

const Timer = () => {
  // const css = useStyles()
  const [timer, setTimer] = React.useState<TimerInterface>()
  getTimer()

  async function getTimer() {
    const response = await fetch('api/')
    const data: TimerInterface = await response.json()
    setTimer(data)
  }

  // Creating new timer in DB
  async function createTimer(newTimer: TimerInterface) {
    // Add timer to the database - need to add error handling
    await fetch('/api/createTimer', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newTimer),
    })
  }

  // Get time left from timer in DB
  async function getTimeLeft() {
    // const response = await fetch("/api/getTimeLeft")
    // const data: TimerInterface = await response.json() // this is where the error is
    // setTimer(data)
    // setTimeout(getTimeLeft, 1000)
  }

  return <Typography>{timer?.timer_duration}</Typography>
}

export default Timer
