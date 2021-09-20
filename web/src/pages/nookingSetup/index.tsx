import React from "react"

// Material UI imports
import { Card } from "@mui/material"
import { alpha } from "@mui/material/styles"

// Component Imports
import TimerForm from "../../components/countdownTimer/form"
import TodoListApp from "../../components/todoList"

const NookingSetup = () => {
    return (
        <Card
            sx={{
                height: "100%",
                width: "100%",
                padding: "1rem",
            }}
        >
            <TodoListApp />
            <TimerForm />
        </Card>
    )
}

export default NookingSetup
