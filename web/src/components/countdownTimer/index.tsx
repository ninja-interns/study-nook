// Import dependencies
import * as React from "react"

// Import Components
import TimerForm from "./Form"

// Import Interfaces
import { TimerInterface } from "./interfaces"

// TimerApp Component
const TimerApp = () => {
    // This state represents a Timer object
    const [currentTimer, setCurrentTimer] = React.useState<TimerInterface>({ isPaused: false, time_left: "0", timer_duration: 0 })
    // const [seconds, setSeconds] = React.useState(0)

    const handleCreateTimer = (newTimer: TimerInterface) => {
        deleteTimer()
        createTimer(newTimer)
        getTimeLeft()
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

    // Get time left from timer in DB
    async function getTimeLeft() {
        const response = await fetch("/api/getTimeLeft")
        const data: TimerInterface = await response.json() // this is where the error is
        setCurrentTimer(data)

        setTimeout(getTimeLeft, 1000)
    }

    // setInterval(() => getTimeLeft(), 1000)

    async function deleteTimer() {
        await fetch("/api/deleteTimer")
    }

    return (
        <div className="timer-app">
            <h1>Timer</h1>
            <TimerForm timer={currentTimer} handleCreateTimer={handleCreateTimer} />
            {/* <Timer /> */}
            <header>{currentTimer.time_left}</header>
        </div>
    )
}
export default TimerApp
