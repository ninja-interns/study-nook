import React from "react";
import { useStyles } from "./badgeCss";

import badgeIcon from "../../assets/medal.png";

interface BadgeProps {
    badgeID: string;
    badgeType: string;
    badgeLevel: string;
    progression: number;
    goal: number;
}


export function Badge({ badgeID, badgeType, badgeLevel, progression, goal }: BadgeProps): JSX.Element {
    const css = useStyles();

    return (
        <figure>
            <img
                className={css.badgeElement}
                src={badgeIcon}
                alt="badge"
                id={badgeID}
            />
            <figcaption className={css.badgeCaption}>
                {badgeType} - {badgeLevel}
            </figcaption>
            <span className={css.textBox}>
                {" "}
                Progression:
                <p className={css.tracker}>{progression}/{goal}</p>
                <span className={css.bar}>
                    <span className={css.achievementLevel1}></span>
                </span>
            </span>
        </figure>
    );
}
