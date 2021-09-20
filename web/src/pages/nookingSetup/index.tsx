import React from "react";

// Material UI imports
import { Card, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Component Imports
import TimerForm from "../../components/countdownTimer/form";
import TodoListApp from "../../components/todoList";

const NookingSetup = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        padding: "1rem",
      }}
    >
      {theme.palette.mode} mode
      <TimerForm />
      <TodoListApp />
    </Card>
  );
};

export default NookingSetup;
