//Timer Interface
export interface TimerInterface {
	id: string
	timerHours: number
	timerMinutes: number
	timerSeconds: number
}

// Timer Form Interface
export interface TimerFormInterface {
	timer: TimerInterface
	handleTimerCreate: (timer: TimerInterface) => void
}

export interface TimerItemInterface {
	timer: TimerInterface
}
