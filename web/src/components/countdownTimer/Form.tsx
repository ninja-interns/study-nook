import * as React from "react"
// Interfaces
import { TimerFormInterface, TimerInterface } from "./interfaces"
// Material UI Imports
import { ButtonGroup, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import { useStyles } from "./timerCss"

const TimerForm = (props: TimerFormInterface) => {
    const css = useStyles()
    const [timerDuration, setTimerDuration] = React.useState(0)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Prevent the page refreshing
        event.preventDefault()

        // Prepare new timer object
        const newTimer: TimerInterface = {
            isPaused: false,
            time_left: "",
            timer_duration: timerDuration,
        }

        // Create new timer
        props.handleCreateTimer(newTimer)
    }

    function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
        setTimerDuration(event.target.value as number)
    }

    return (
        <div>
            {/* This is the form that takes in the timer input */}
            <form onSubmit={handleSubmit}>
                <FormControl variant="outlined" className={css.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Timer Duration</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={timerDuration}
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
