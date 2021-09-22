// ! If you refresh the page the old timer is deleted and a new one is made - should handle the delete in the database instead?

import { Typography} from '@material-ui/core'
import { Card, CardContent } from '@mui/material'
import * as React from 'react'
import {TimerInterface} from '../interfaces'

const Timer = () => {
  const [mounted, setMounted] = React.useState(false)
  const [timer, setTimer] = React.useState<TimerInterface>()
  const [ticker, setTicker] = React.useState<number>(0)

 // Creating new timer in DB - Runs only once
 React.useEffect(() => {
    async function createTimer() {
      await fetch('/api/createTimer')
    }
    createTimer()
    setMounted(true)
  }, [])
  
  React.useEffect(() => {
    if (mounted) {
      getTimeLeft()
    }
    async function getTimeLeft() {
      const response = await fetch("/api/getTimeLeft")
      const data: TimerInterface = await response.json() // this is where the error is
      if (data.time_left === "0s") {
        data.time_left = "Timer Finished"
        setMounted(false)
        //set is completed in database to true (call a function)
      } 
      setTimer(data)
    }
  }, [mounted, ticker])
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTicker(ticker => ticker + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  
  
  return (
    <Card sx={{ display: 'flex', width:"50%"}}>
      <CardContent>
        <Typography variant="h4">{timer?.time_left}</Typography>
      </CardContent>
    </Card>
  )
}

export default Timer
