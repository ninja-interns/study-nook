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

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    async function handleRecover(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        //hitting the backend route of /loginUser with the body of necessary values
        try {
            const response = await fetch("/api/checkEmail", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email }),
            });
        }
        catch {

        }
    }

    return (
        <div className={css.container}>
            <div className={css.verticalCenter}>
                <h4>Please, enter your email: </h4>
                <form onSubmit={handleRecover}>
                    <TextField required label="Email" type="email" onChange={handleChange} />
                    <Button className={css.recoverButton} variant="contained" color="primary" type="submit">
                        Recover Password
                    </Button>
                </form>
            </div>
        </div>
    );
}
