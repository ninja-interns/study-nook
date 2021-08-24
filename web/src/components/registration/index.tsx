import React from "react";
import { useStyles } from "./registrationCss";
import { InputAdornment, TextField, Input } from '@material-ui/core';

export function Registration() {
    const css = useStyles();
    return (
        <div className={css.container}>
            <TextField id="standard-basic" label="Username" />
            <TextField id="standard-basic" label="Email" />
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

