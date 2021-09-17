import React from "react"

// Material UI imports
import { Card } from "@material-ui/core"
import { useStyles } from "./nookingSetupCss"

// Component Imports
import TimerForm from "../../components/countdownTimer/form"
// import TodoForm from "../../components/todoList/form"
// import TodoList from "../../components/todoList/list"
import TodoListApp from "../../components/todoList"
// import Timer from "../../components/countdownTimer/timer"

const NookingSetup = () => {
    const css = useStyles()
    return (
        <Card className={css.container}>
            <TodoListApp />
            <TimerForm />
            {/* <TodoForm />
            <TodoList /> */}
            {/* <Timer /> */}
        </Card>
    )
}

export default NookingSetup
