import React, { useState } from "react";
//import { useStyles } from "./homeCss";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";

export function ForgetPassword() {
    //	const css = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState();

    return (
        <div>
            <h4>Please, enter your email: </h4>
            <TextField required label="Email" type="email" />
            <Button variant="contained" color="primary" >
                Recover Password
            </Button>
        </div>

    );
}
