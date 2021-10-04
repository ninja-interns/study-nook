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

interface IResponse {
    unlocked: boolean;
}

export function Badge({ badgeID, badgeType, badgeLevel, progression, goal }: BadgeProps): JSX.Element {
    const css = useStyles();

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        //hitting the backend route of /loginUser with the body of necessary values
        try {
            const response = await fetch("/api/achievement_check", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ badgeID: { badgeID } }),
            });
            //awaiting the response to comeback and turn it into readable json data
            const data: IResponse = await response.json();
            //if the response said that it is valid, it will push to the dashboard, else it will set the error to the message that was sent back
            if (data.unlocked) {

            } else {

            }
        } catch (err) {
            console.error(err);
        }
    }

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
