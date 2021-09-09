import { NookInterface } from "./NookInterface";
import { ChangeProfileImage } from "./ProfileImageHandler";
import { PlayerProgressBar } from "./ProfileLevelBar";
import { PlayerProfileSettings } from "./ProfileSettings";
import defaultImage from '../../assets/default-profile.png'
import { AchievementButton, StartNookButton } from "./ProfileButtons";
export function Interface() {
    return (
        <NookInterface/>
    )
}

export function ProfileAvatar() {
    return <ChangeProfileImage initial={defaultImage}/>
}

export function ProfileSettings() {
    return (<PlayerProfileSettings/>);
}

export function ProgressBar() {
    return (
        <PlayerProgressBar />
    );
}

export function NookButton() {
    return (
        <StartNookButton />
    );
}

export function LatestAchievementButton() {
    return (
        <AchievementButton/>
    );
}



