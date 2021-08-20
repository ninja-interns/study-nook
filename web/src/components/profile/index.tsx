import React from "react";
import { ChangeProfileImage } from "./ProfileImageHandler";
import { IProps } from "./ProfileInterface";
import { PlayerProgressBar } from "./ProfileLevelBar";
import { PlayerProfileSettings } from "./ProfileSettings";


require('./style.css')


export function ProfileSettings() {
    return (<PlayerProfileSettings/>);
}

export function ProgressBar() {
    return (
        <PlayerProgressBar />
    );
}

export function ProfileChange() {
    return ChangeProfileImage();
}




