import { useStyles } from "./menuCss";
import { useState } from "react";
import { Typography, Fade } from "@material-ui/core";
import { useHistory, Route, Redirect } from "react-router-dom";
import { Logout } from "../../components";

import closeButton from "../../assets/close-button.png";

export function MenuPage() {
    const css = useStyles();
    const history = useHistory();
    const [redirect, setRedirect] = useState<string | null>(null);

    return (
        <>
            <Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
            <Fade in={true} timeout={1000}>
                <div className={css.container}>
                    <img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>

                    <Typography className={css.options} variant="h4">Settings</Typography>
                    <Typography className={css.options} variant="h4" onClick={() => history.push("./achievements")}>Achievements</Typography>
                    <Typography className={css.options} variant="h4">Sessions History</Typography>
                    <Typography className={css.options} variant="h4">Study History</Typography>
                    <Typography className={css.options} variant="h4" onClick={() => history.push("./support")}>Support</Typography>
                    <Typography className={css.options} variant="h4"><Logout /></Typography>

                </div >
            </Fade>
        </>
    );
}
