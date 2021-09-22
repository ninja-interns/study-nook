//Timer Interface
export interface TimerInterface {
	isPaused: boolean
	time_left: string
	timer_duration: number // in minutes
}

// Timer Form Interface
export interface TimerFormInterface {
	timer: TimerInterface
	handleCreateTimer: (timer: TimerInterface) => void
}

export interface TimerItemInterface {
	timer: TimerInterface
}
