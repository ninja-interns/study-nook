import React, { useState } from "react";
import { useStyles } from "./registrationCss";
import { InputAdornment, TextField, Input, FormControl, Button } from '@material-ui/core';


export function Registration() {
    const css = useStyles();

    // State objects for username, password, email, name
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Fetching data to back-end 
        fetch('http://localhost:8080/api/signup', {

            // Passing POST method
            method: 'POST',

            // Declaring what type of data is being fetched
            headers: { "Content-Type": "application/json" },

            // Converting username and password state objects
            // to a JSON string
            body: JSON.stringify({ username, password, email, name })
        })
        /*.then(response => response.json())
        .then(response => {
            console.log("This is response: " + JSON.stringify(response));
        })*/

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        } else if (e.target.name == 'email') {
            setEmail(e.target.value);
        } else if (e.target.name == 'name') {
            setName(e.target.value);
        }
    }


    return (
        <div className={css.container}>
            <div className={css.verticalCenter}>
                <form onSubmit={handleSubmit}>
                    <TextField id="standard-basic" label="Username" name="username" onChange={handleChange} />
                    <TextField id="standard-basic" label="Email" name="email" onChange={handleChange} />
                    <TextField id="standard-password-input" label="Password" type="password" name="password" onChange={handleChange} />
                    <TextField id="standard-basic" label="Name" name="name" onChange={handleChange} />
                    <Button className={css.submitButton} variant="contained" color="primary" type="submit">Sign up</Button>
                </form>
            </div>
        </div>
    );
}

// Password field
/*<Input
    id="standard-adornment-password"
    type={values.showPassword ? 'text' : 'password'}
    value={values.password}
    onChange={handleChange('password')}
    endAdornment={
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
            >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    }
/>*/

