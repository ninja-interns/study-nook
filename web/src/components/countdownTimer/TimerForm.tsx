import * as React from "react"
// Interfaces
import { TimerFormInterface, TimerInterface } from "./interfaces"
// Material UI Imports
import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import { useStyles } from "../../pages/nookingSetup/nookingSetupCss"

const TimerForm = () => {
    const css = useStyles()
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

    function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
        setDuration(event.target.value as number)
    }

    return (
        <div>
            {/* This is the form that takes in the timer input */}
            <form onSubmit={handleSubmit}>
                <FormControl variant="outlined" className={css.formControl}>
                    <InputLabel>Timer Duration</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={duration}
                        onChange={handleChange}
                        label="timerDuration"
                    >
                        <MenuItem value={0}>
                            <em>0</em>
                        </MenuItem>
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
