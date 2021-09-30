import React from "react";
import { TodoListInterface } from "../interfaces";
import { IconButton, List, ListItem, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * * TODO LIST (FORM) COMPONENT
 * * Displays the users current todo list - The user can update and delete these todos
 */
const TodoListForm = (props: TodoListInterface) => {
  if (props.todos === undefined || null) return null; // Return nothing if there are no todos in the list

  return (
    <List
      sx={{
        height: "15rem",
        overflow: "auto",
        width: "100%",
        backgroundColor: "grey",
      }}
    >
      {/* Itterate through the todos array and load each todo item */}
      {props.todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo.todoText}`;
        return (
          <ListItem key={todo.id} dense>
            <TextField
              fullWidth
              id={labelId}
              // variant="standard"
              defaultValue={todo.todoText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                props.handleTodoUpdate(event, todo)
              }
              error={todo.todoText === ""}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => props.handleTodoRemove(todo)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export { TodoListForm };
