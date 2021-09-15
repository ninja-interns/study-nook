import * as React from "react"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { TimerFormInterface, TimerInterface } from "./interfaces"
import { TextField } from "@material-ui/core"

function TimerForm(props: TimerFormInterface) {
    // Create reference for form input
    const timerRef = React.useRef<HTMLInputElement>()

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Prevent the page refreshing
        event.preventDefault()

        // Prepare new timer object
        const newTimer: TimerInterface = {
            isPaused: false,
            time_left: "",
            timer_duration: 100,
        }

        // Create new timer
        props.handleTimerCreate(newTimer)
    }

    return (
        <div>
            {/* This is the form that takes in the timer input */}
            <form onSubmit={handleSubmit}>
                <TextField
                    // Material UI
                    label="Hours"
                    id="outlined-basic"
                    variant="outlined"
                    // --
                    inputRef={timerRef}
                    type="number"
                />
                <Button type="submit">Submit</Button>
            </form>

            <div className="timer-component">
                <ButtonGroup variant="contained">
                    <Button className="start-button">Start</Button>
                    <Button className="pause-button">Pause</Button>
                    <Button className="reset-button">Reset</Button>
                </ButtonGroup>
                <p>{props.timer.time_left}</p>
            </div>
        </div>
    )
}

export { TimerForm }

// add 30 minutes to the current time then countdown to that time?
// save the timer on a cookie?
