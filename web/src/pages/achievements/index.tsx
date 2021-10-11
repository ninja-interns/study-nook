import { Slide, Fade } from "@material-ui/core";
import { useStyles } from "./achievementsCss";
import { useHistory, Route, Redirect } from "react-router-dom";
import { useState } from "react";

import closeButton from "../../assets/close-button.png";
import badgeIcon from "../../assets/medal.png";
import { Badge } from "../../components";

export function AchievementsPage() {
    const css = useStyles();
    const history = useHistory();
    const [redirect, setRedirect] = useState<string | null>(null);

    return (
        <>
            <Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
            <Slide in={true} direction={"left"} timeout={1000}>
                <div className={css.container}>
                    <img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>

                    <Fade in={true} timeout={2000}>
                        <div className={css.badgesTable}>

                            <Badge badgeID={"level-1"} badgeType={"Level badge"} badgeLevel={"Level 1"} progression={0} goal={1}></Badge>

                            <Badge badgeID={"level-10"} badgeType={"Level badge"} badgeLevel={"Level 10"} progression={0} goal={10}></Badge>

                            <Badge badgeID={"level-20"} badgeType={"Level badge"} badgeLevel={"Level 20"} progression={0} goal={20}></Badge>

                            <Badge badgeID={"sessions-completed-1"} badgeType={"Session completed"} badgeLevel={"1 Session"} progression={0} goal={1}></Badge>

                            <Badge badgeID={"sessions-completed-10"} badgeType={"Session completed"} badgeLevel={"10 Session"} progression={0} goal={10}></Badge>

                            <Badge badgeID={"sessions-completed-20"} badgeType={"Session completed"} badgeLevel={"20 Session"} progression={0} goal={20}></Badge>

                            <Badge badgeID={"hours-nooking-1"} badgeType={"Hours focused"} badgeLevel={"1 hour"} progression={0} goal={1}></Badge>

                            <Badge badgeID={"hours-nooking-5"} badgeType={"Hours focused"} badgeLevel={"5 hours"} progression={0} goal={5}></Badge>

                            <Badge badgeID={"hours-nooking-10"} badgeType={"Hours focused"} badgeLevel={"10 hours"} progression={0} goal={10}></Badge>

                            <Badge badgeID={"focus-zones-unlocked-2"} badgeType={"Focus Zones unlocked"} badgeLevel={"2 zones"} progression={0} goal={2}></Badge>

                            <Badge badgeID={"focus-zones-unlocked-5"} badgeType={"Focus Zones unlocked"} badgeLevel={"5 zones"} progression={0} goal={5}></Badge>

                            <Badge badgeID={"focus-zones-unlocked-10"} badgeType={"Focus Zones unlocked"} badgeLevel={"10 zones"} progression={0} goal={10}></Badge>

                        </div>
                    </Fade>

                </div >
            </Slide>
        </>

    );
}
