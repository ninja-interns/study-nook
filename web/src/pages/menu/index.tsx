import { useStyles } from "./menuCss";
import { Typography, Fade } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Logout } from "../../components";
import closeButton from "../../assets/close-button.png";

export function MenuPage() {
    const css = useStyles();
    const history = useHistory();

    return (
        <Fade in={true} timeout={1000}>
            <div className={css.container}>
                <img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>

                <Typography className={css.options} variant="h4">Settings</Typography>
                <Typography className={css.options} variant="h4">Achievements</Typography>
                <Typography className={css.options} variant="h4">Sessions History</Typography>
                <Typography className={css.options} variant="h4">Study History</Typography>
                <Typography className={css.options} variant="h4" onClick={() => history.push("./support")}>Support</Typography>
                <Typography className={css.options} variant="h4"><Logout /></Typography>

            </div >
        </Fade>
    );
}
