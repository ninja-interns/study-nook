//Timer Interface
export interface TimerInterface {
	id: string
	timerNum: number
	isPaused: boolean
}

// Timer Form Interface
export interface TimerFormInterface {
	handleTimerCreate: (timer: TimerInterface) => void
}

// Timer Item Interface
export interface TimerItemInterface {
	handleTimerPause: (id: string) => void
	handleTimerReset: (id: string) => void
	timer: TimerInterface
}
