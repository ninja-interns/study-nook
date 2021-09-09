import { Button } from '@material-ui/core';
import { ProfileSettings, ProfileAvatar, ProgressBar } from '../../components';
import { NookInterface } from '../../components/profile/NookInterface';
import { useStyles } from './profileStyle';


export function ProfilePage() {
    const cssStyle = useStyles();
    return (
        <div className={cssStyle.container}>
            <ProfileAvatar />
            <ProgressBar/>
            <Button variant="contained" color="primary" component="span">
                Start nooking
            </Button>
            <ProfileSettings />
            <NookInterface />
            <Button variant="contained" color="primary" component="span">
                Latest Badge
            </Button>

        </div>
    );
}
