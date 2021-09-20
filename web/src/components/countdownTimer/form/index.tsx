// ! There is an error with the material UI form control

import * as React from "react"
import { TimerInterface } from "../interfaces"
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { alpha } from "@mui/material/styles"

const TimerForm = () => {
    // const css = useStyles()
    const [duration, setDuration] = React.useState(0)

    const handleCreateTimer = (newTimer: TimerInterface) => {
        deleteTimer()
        createTimer(newTimer)
    }

    // Creating new timer in DB
    async function createTimer(newTimer: TimerInterface) {
        // Add timer to the database - need to add error handling
        await fetch("/api/createTimer", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newTimer),
        })
    }

    async function deleteTimer() {
        await fetch("/api/deleteTimer")
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Prevent the page refreshing
        event.preventDefault()

        // Prepare new timer object
        const newTimer: TimerInterface = {
            isPaused: false,
            time_left: "",
            timer_duration: duration,
        }

        // Create new timer
        handleCreateTimer(newTimer)
    }

    function handleChange(event: SelectChangeEvent<number>) {
        setDuration(event.target.value as number)
    }

    return (
        <div>
            {/* This is the form that takes in the timer input */}
            <form onSubmit={handleSubmit}>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">Timer Duration</InputLabel>
                    <Select value={duration} onChange={handleChange} label="Timer Duration">
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default TimerForm
