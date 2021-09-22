import { Typography} from '@material-ui/core'
import * as React from 'react'
import {TimerInterface} from '../interfaces'

const Timer = () => {
  const [mounted, setMounted] = React.useState(false)
  const [getTimeLeft, setGetTimeLeft] = React.useState(false)
  const [timer, setTimer] = React.useState<TimerInterface>()
  const [ticker, setTicker] = React.useState<number>(0)

 // Creating new timer in DB - Runs only once
 React.useEffect(() => {
    async function createTimer() {
      console.log("creating timer")
      await fetch('/api/createTimer')
    }
    createTimer()
    setMounted(true)
  }, [])
  
  React.useEffect(() => {
    async function getTimeLeft() {
      console.log("getting timer")
      const response = await fetch("/api/getTimeLeft")
      const data: TimerInterface = await response.json() // this is where the error is
      setTimer(data)
    }
    if (mounted) {
      getTimeLeft()
      setGetTimeLeft(true)
    }
  }, [mounted, ticker])
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTicker(ticker => ticker + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  
  
  return <Typography>{timer?.time_left}</Typography>
}

export default Timer

// function useInterval(callback, delay) {
//   const savedCallback = React.useRef();

//   // Remember the latest callback.
//   React.useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   React.useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

// function Timer() {
//   let [requestCount, setRequestCount] = React.useState(0);

//   // Run every second
//   const delay = 1000;

//   useInterval(() => {
//     // Make the request here
//     setRequestCount(requestCount + 1);
//   }, delay);

//   return <h1>{requestCount}</h1>;
// }

// export default function App() {
//   return (
//     <div className="Timer">
//       <Timer />
//     </div>
//   );
// }