import { Slide } from "@material-ui/core";
import { useStyles } from "./achievementsCss";
import { useHistory } from "react-router-dom";

import closeButton from "../../assets/close-button.png";

export function AchievementsPage() {
    const css = useStyles();
    const history = useHistory();

    return (
        <Slide in={true} direction={"left"} timeout={1000}>
            <div className={css.container}>
                <img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>




            </div >
        </Slide>
    );
}
