import { ProfileSettings, ProfileAvatar } from '../../components';
import { NookInterface } from '../../components/profile/NookInterface';
import { ChangeProfileImage } from '../../components/profile/ProfileImageHandler';
import { useStyles } from './profileStyle';


export function ProfilePage() {
    const cssStyle = useStyles();
    return (
        <div className={cssStyle.container}>
            <ProfileAvatar />
            <ProfileSettings />
            <NookInterface />
        </div>
    );
}
