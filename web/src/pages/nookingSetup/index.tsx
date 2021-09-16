import React from "react"

import TodoListApp from "../../components/todoList"
import { Card } from "@material-ui/core"
import { useStyles } from "./nookingSetupCss"

// Import Interfaces
import { TodoContent } from "../../components/todoList/interfaces"

// Timer Imports
import TimerForm from "../../components/countdownTimer/TimerForm"
import Timer from "../../components/countdownTimer/Timer"

const NookingSetup = () => {
    const css = useStyles()
    return (
        <Card className={css.container}>
            <TodoListApp />
            {/* <TimerApp /> */}
            <TimerForm />
            <Timer />
        </Card>
    )
}

export default NookingSetup
