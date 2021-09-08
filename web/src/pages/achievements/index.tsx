import { Slide, Fade } from "@material-ui/core";
import { useStyles } from "./achievementsCss";
import { useHistory } from "react-router-dom";

import closeButton from "../../assets/close-button.png";
import badgeIcon from "../../assets/medal.png";

export function AchievementsPage() {
    const css = useStyles();
    const history = useHistory();

    return (
        <Slide in={true} direction={"left"} timeout={1000}>
            <div className={css.container}>
                <img className={css.closeButton} src={closeButton} alt="Close button" onClick={() => history.goBack()}></img>

                <Fade in={true} timeout={2000}>
                    <div className={css.badgesTable}>
                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"level-1"} />
                            <figcaption className={css.badgeCaption}>Level badge - Level 1</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/1</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"level-20"} />
                            <figcaption className={css.badgeCaption} >Level badge - Level 10</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/10</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"level-50"} />
                            <figcaption className={css.badgeCaption}>Level badge - Level 20</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/20</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"sessions-completed-1"} />
                            <figcaption className={css.badgeCaption}>Sessions completed - 1 Session</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/1</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"sessions-completed-10"} />
                            <figcaption className={css.badgeCaption}>Sessions completed - 10 session</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/10</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"sessions-completed-20"} />
                            <figcaption className={css.badgeCaption}>Sessions completed - 20 sessions</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/20</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"hours-nooking-1"} />
                            <figcaption className={css.badgeCaption}>Hours focused - 1 hour</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/1</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"hours-nooking-5"} />
                            <figcaption className={css.badgeCaption}>Hours focused - 5 hours</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/5</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"hours-nooking-10"} />
                            <figcaption className={css.badgeCaption}>Hours focused - 10 hours</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/10</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"hours-nooking-1"} />
                            <figcaption className={css.badgeCaption}>Characters unlocked - 2</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/2</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"hours-nooking-5"} />
                            <figcaption className={css.badgeCaption}>Characters unlocked - 5</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/5</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>

                        <figure>
                            <img className={css.badgeElement} src={badgeIcon} alt="Badge" id={"hours-nooking-10"} />
                            <figcaption className={css.badgeCaption}>Characters unlocked - 10</figcaption>
                            <span className={css.textBox}> Progression:
                                <p className={css.tracker}>0/10</p>
                                <span className={css.bar}>
                                    <span className={css.achievementLevel1}></span>
                                </span>
                            </span>
                        </figure>
                    </div>
                </Fade>

            </div >
        </Slide>
    );
}
