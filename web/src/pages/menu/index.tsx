//ts-ignore is ignoring error "possibly undefined"

import React, { useRef, useState } from "react";
import { useStyles } from "./menuCss";
import { TextField, Card, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import closeButton from "../../assets/close-button.png";

export function MenuPage() {
    const css = useStyles();
    const history = useHistory();

    return (
        <div className={css.container}>
            <img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>

            <Typography className={css.options} variant="h4">Settings</Typography>
            <Typography className={css.options} variant="h4">Achievements</Typography>
            <Typography className={css.options} variant="h4">Sessions History</Typography>
            <Typography className={css.options} variant="h4">Study History</Typography>
            <Typography className={css.options} variant="h4">Support</Typography>

        </div >
    );
}
