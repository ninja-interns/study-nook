import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./dashboardCss";
import { useHistory } from "react-router";

export function Dashboard() {
    const css = useStyles();
    const history = useHistory();

    return (
        <div className={css.container}>
            <Button className={css.menuButton} variant="contained" color="primary" onClick={() => history.push("../menu")}>
                Menu
            </Button>
        </div >
    );
}