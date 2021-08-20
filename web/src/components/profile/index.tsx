import { ProfileAvatarViewer } from "./ProfileAvatar";
import { ChangeProfileImage } from "./ProfileImageHandler";
import { PlayerProgressBar } from "./ProfileLevelBar";
import { PlayerProfileSettings } from "./ProfileSettings";

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




