import { IconButton, Typography } from "@material-ui/core"
import * as React from "react"
import { TimerInterface } from "./interfaces"
import { PlayArrow } from "@material-ui/icons"
import { useStyles } from "../../pages/nookingSetup/nookingSetupCss"

const Timer = () => {
    // const css = useStyles()
    const [timer, setTimer] = React.useState<TimerInterface>()
    getTimeLeft()

    // Get time left from timer in DB
    async function getTimeLeft() {
        const response = await fetch("/api/getTimeLeft")
        const data: TimerInterface = await response.json() // this is where the error is
        setTimer(data)

        setTimeout(getTimeLeft, 1000)
    }

    return (
        <div>
            <div>
                <IconButton aria-label="play/pause">
                    <PlayArrow />
                </IconButton>
            </div>
            <Typography>Timer: {timer?.time_left}</Typography>
        </div>
    )
}

export default Timer
