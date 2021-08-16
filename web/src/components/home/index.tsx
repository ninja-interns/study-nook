import React from "react";
import { useStyles } from "./homeCss";
import Button from "@material-ui/core/Button";

export function Home() {
    const css = useStyles();
    return (
        <div className={css.container}>
            <div className={css.verticalCenter}>
                <h3 className={css.imageCss}>Cute Image Here</h3>
            </div>

            <div className={css.buttonsClass}>
                <div className={css.left}>
                    <Button variant="contained" color="primary">Create Account</Button>
                </div>

                <div className={css.right}>
                    <Button variant="contained" color="primary">Login</Button>
                </div>
            </div>
        </div>
    );
}
