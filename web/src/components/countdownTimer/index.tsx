// Import dependencies
import * as React from "react"
// Import Components
import TimerForm from "./TimerForm"
// Import Interfaces
import { TimerInterface } from "./interfaces"
// Import Material UI
import { useStyles } from "./timerCss"
import { IconButton, Typography } from "@material-ui/core"
import { PlayArrow } from "@material-ui/icons"

// TimerApp Component
const TimerApp = () => {
    const css = useStyles()
    const [currentTimer, setCurrentTimer] = React.useState<TimerInterface>({ isPaused: false, time_left: "0", timer_duration: 0 })

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

        setCurrentTimer(newTimer)
    }

    async function deleteTimer() {
        await fetch("/api/deleteTimer")
    }

    return (
        <div className="timer-app">
            <div className={css.details}>
                <Typography component="h5" variant="h5">
                    Timer: {currentTimer.time_left}
                </Typography>
            </div>
            <TimerForm />
        </div>
    )
}
export default TimerApp
