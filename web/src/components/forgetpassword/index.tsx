import React, { useState } from "react";
//import { useStyles } from "./homeCss";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { useStyles } from "./forgetPasswordCss";

export function ForgetPassword() {
    const css = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState();

    const handleRecover = () => {

    }

    return (
        <div className={css.container}>
            <div className={css.verticalCenter}>
                <h4>Please, enter your email: </h4>
                <form onSubmit={handleRecover}>
                    <TextField required label="Email" type="email" />
                    <Button className={css.recoverButton} variant="contained" color="primary" type="submit">
                        Recover Password
                    </Button>
                </form>
            </div>
        </div>
    );
}
