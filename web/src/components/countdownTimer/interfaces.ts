//Timer Interface
export interface TimerInterface {
	id: string
	timerHours: number
	timerMinutes: number
	timerSeconds: number
	isPaused: boolean
}

// Timer Form Interface
export interface TimerFormInterface {
	handleTimerCreate: (timer: TimerInterface) => void
}

// Timer Item Interface
export interface TimerItemInterface {
	timer: TimerInterface
	handleTimerPause: (timer: TimerInterface) => void
	handleTimerReset: (timer: TimerInterface) => void
}
