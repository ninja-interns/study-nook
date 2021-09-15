// Import dependencies
import * as React from "react"

// Import Components
import { TimerForm } from "./Form"
import { Timer } from "./Timer"

// Import Interfaces
import { TimerInterface } from "./interfaces"
import { clearInterval } from "timers"

// TimerApp Component
const TimerApp = () => {
    // This state represents a Timer object
    const [timer, setTimer] = React.useState<TimerInterface>({ isPaused: false, time_left: "", timer_duration: 100 })
    const [seconds, setSeconds] = React.useState(5)

    // Creating new Timer

    async function createTimer() {
        // send the timer here
        // Add todo to the database - need to add error handling
        await fetch("/api/createTimer", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(timer),
        })

        getTimeLeft()
    }

    async function getTimeLeft() {
        const response = await fetch("/api/getTimeLeft")
        const data: TimerInterface = await response.json() // this is where the error is
        setTimer(data)
        console.log(data)
    }

    async function deleteTimer() {
        await fetch("/api/deleteTimer")
    }
    // createTimer()
    // getTimeLeft() // Needs to update every second to display the timer?

    // This is running more than every second?
    // I want to fetch the time every second
    // setInterval(getTimeLeft, 1000)
    // async function getTimeLeft() {
    //     const response = await fetch("/api/getTimeLeft")
    //     const data: TimerInterface = await response.json()
    //     setTimer(data)
    // }

    return (
        <div className="timer-app">
            <h1>Timer</h1>
            {/* <TimerForm timer={timer} handleTimerCreate={handleTimerCreate} /> */}
            {/* <Timer /> */}
            <header>{timer.time_left}</header>
            <button onClick={deleteTimer}>Delete Timer</button>
            <button onClick={createTimer}>Create Timer</button>
        </div>
    )
}
export default TimerApp
