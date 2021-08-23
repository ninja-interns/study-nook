import React, { useRef, useState } from "react";
import Link from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { TextField, Card, Button, Typography } from "@material-ui/core";
import { useStyles } from "./changePasswordCss";

export function ChangePassword() {
    const css = useStyles();
    const history = useHistory();
    const location = useLocation();
    const passwordRef = useRef<HTMLInputElement>();
    const passwordConfirmRef = useRef<HTMLInputElement>();
    const [error, setError] = useState("");

    async function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        //not letting user continue to send to DB if the passwords do not match
        if (passwordRef?.current?.value.trim() !== passwordConfirmRef?.current?.value) {
            setError("Passwords do not match.");
            return;
        }

        //not letting user continue to send to DB if the password or email ref if there are just spaces filled out.
        if (passwordRef?.current?.value.trim() === "") {
            setError("Please fill out with characters fields");
            return;
        }

        var token = location.pathname

        //hitting the backend route of /loginUser with the body of necessary values
        try {
            const response = await fetch("/api/changePassword", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ password: passwordRef?.current?.value, token }),
            });
            const data = await response.json();
            if (data.isValid) {
                history.push("/login");
            } else {
                setError(data.message);
            }
        }
        catch {

        }
    }

    return (
        <div className={css.container}>
            <div className={css.verticalCenter}>
                <Typography variant="h5">Change Password</Typography>
                <Typography variant="body1">{error}</Typography>
                <form onSubmit={handlePasswordChange}>
                    <TextField required label="Password" type="password" inputRef={passwordRef} />
                    <TextField required label="Confirm Password" type="password" inputRef={passwordConfirmRef} />
                    <Button className={css.changePassword} variant="contained" color="primary" type="submit">
                        Change Password
                    </Button>
                </form>
            </div>
        </div>
    );
}
