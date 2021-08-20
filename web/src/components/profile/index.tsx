import React from "react";
import { ProfileAvatarViewer } from "./ProfileAvatar";
import { ChangeProfileImage } from "./ProfileImageHandler";
import { IProps } from "./ProfileInterface";
import { PlayerProgressBar } from "./ProfileLevelBar";
import { PlayerProfileSettings } from "./ProfileSettings";


require('./style.css')


export function ProfileAvatar() {
    return (
        <ProfileAvatarViewer />
    );
}

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




