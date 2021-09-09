import { ProfileSettings, ProfileAvatar, ProgressBar, NookButton, LatestAchievementButton } from '../../components';
import { NookInterface } from '../../components/profile/NookInterface';
import { useStyles } from './profileStyle';


export function ProfilePage() {
    const cssStyle = useStyles();
    return (
        <div className={cssStyle.container}>
            <ProfileAvatar />
            <ProgressBar />
            <NookButton/>
            <ProfileSettings />
            <NookInterface />
            <LatestAchievementButton/>
        </div>
    );
}
