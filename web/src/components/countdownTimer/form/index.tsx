// ! There is an error with the material UI form control

import * as React from 'react'
import {TimerInterface} from '../interfaces'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

const TimerForm = () => {
  
  function handleChange(event: SelectChangeEvent<number>) {
    
    // Prepare new timer object
    const newTimer: TimerInterface = {
      isPaused: false,
      time_left: '',
      timer_duration: Number(event.target.value),
    }
    
    handleCreateTimer(newTimer)
  }
  
  function handleCreateTimer(newTimer: TimerInterface) {
    deleteTimer()
    createTimerDuration(newTimer)
  }
  
  // Creating new timer in DB
  async function createTimerDuration(newTimer: TimerInterface) {
    await fetch('/api/createTimerDuration', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newTimer),
      // Add error handling
    })
  }
  
  async function deleteTimer() {
    await fetch('/api/deleteTimer')
  }

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="outlined-age-native-simple">
        Timer Duration
      </InputLabel>
      <Select defaultValue={25} label="Timer Duration" onChange={handleChange}>
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={35}>35</MenuItem>
        <MenuItem value={40}>40</MenuItem>
        <MenuItem value={45}>45</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={55}>55</MenuItem>
        <MenuItem value={60}>60</MenuItem>
      </Select>
    </FormControl>
  )
}

export default TimerForm
