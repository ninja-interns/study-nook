// Import Dependencies
import * as React from "react"

// Import Interfaces
import { TimerInterface, TimerItemInterface } from "./interfaces"

// Timer Component
const Timer = (props: TimerItemInterface) => {
	const [time, setTime] = React.useState<TimerInterface>({
		id: props.timer.id,
		timerHours: props.timer.timerHours,
		timerMinutes: props.timer.timerMinutes,
		timerSeconds: props.timer.timerSeconds,
		isPaused: props.timer.isPaused,
	})

	const tick = () => {
		if (time.timerHours === 0 && time.timerMinutes === 0 && time.timerSeconds === 0) {
			reset()
		} else if (time.timerHours === 0 && time.timerSeconds === 0) {
			setTime({
				id: props.timer.id,
				timerHours: time.timerHours - 1,
				timerMinutes: 59,
				timerSeconds: time.timerSeconds - 1,
				isPaused: props.timer.isPaused,
			})
		} else if (time.timerSeconds === 0) {
			setTime({
				id: props.timer.id,
				timerHours: time.timerHours,
				timerMinutes: time.timerMinutes - 1,
				timerSeconds: 59,
				isPaused: props.timer.isPaused,
			})
		} else {
			setTime({
				id: props.timer.id,
				timerHours: time.timerHours,
				timerMinutes: time.timerMinutes,
				timerSeconds: time.timerSeconds - 1,
				isPaused: props.timer.isPaused,
			})
		}
	}

	const reset = () => {
		setTime({
			id: props.timer.id,
			timerHours: time.timerHours,
			timerMinutes: time.timerMinutes,
			timerSeconds: time.timerSeconds,
			isPaused: props.timer.isPaused,
		})
	}

	React.useEffect(() => {
		const timerId = setInterval(() => tick(), 1000)
		return () => clearInterval(timerId)
	})

	return (
		<div className="timer-component">
			{/* This renders the counter of the timer */}
			<div className="timer-input-wrapper">
				<p>
					{`${time.timerHours.toString().padStart(2, "0")}:${time.timerMinutes.toString().padStart(2, "0")}:${time.timerSeconds.toString().padStart(2, "0")}`}
				</p>
			</div>

			<div className="buttons">
				<button className="pause-button">Pause</button>
				<button className="reset-button" onClick={() => props.handleTimerReset}>
					Reset
				</button>
			</div>
		</div>
	)
}

export default Timer
