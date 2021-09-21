// ! There is an error with the material UI form control

import * as React from 'react'
import {TimerInterface} from '../interfaces'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import {Box} from '@mui/system'

const TimerForm = () => {
  const [duration, setDuration] = React.useState(0)

  const handleCreateTimer = (newTimer: TimerInterface) => {
    deleteTimer()
    createTimer(newTimer)
  }

  // Creating new timer in DB
  async function createTimer(newTimer: TimerInterface) {
    // Add timer to the database - need to add error handling
    await fetch('/api/createTimerDuration', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newTimer),
    })
  }

  async function deleteTimer() {
    await fetch('/api/deleteTimer')
  }

  function handleChange(event: SelectChangeEvent<number>) {
    setDuration(event.target.value as number)

    // Prepare new timer object
    const newTimer: TimerInterface = {
      isPaused: false,
      time_left: '',
      timer_duration: duration,
    }

    // Create new timer
    handleCreateTimer(newTimer)
  }

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="outlined-age-native-simple">
        Timer Duration
      </InputLabel>
      <Select value={duration} onChange={handleChange} label="Timer Duration">
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
      </Select>
    </FormControl>
  )
}

export default TimerForm
