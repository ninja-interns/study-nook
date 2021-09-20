import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoContent, TodoFormInterface } from "./interfaces";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

const TodoForm = (props: TodoFormInterface) => {
  // const css = useStyles()
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = React.useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Prepare new todo
    const newTodo: TodoContent = {
      id: uuidv4(),
      user_id: "",
      todo_text: inputText,
      is_completed: false,
    };

    // Create new todo item
    props.handleTodoCreate(newTodo);

    // Reset the input field
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 200,
        maxWidth: "50%",
      }}
    >
      <TextField
        variant="outlined"
        label="Add a todo"
        inputRef={inputRef}
        onChange={handleInputChange}
        color="secondary"
      />
      {/* sx=
            {{
                position: "absolute",
                zIndex: "todoForm",
            }} */}
      {/* <Button type="submit" color="secondary" variant="contained" className={css.todoAddButton}>
                <AddIcon />
            </Button> */}
    </Box>
  );
};

export default TodoForm;
