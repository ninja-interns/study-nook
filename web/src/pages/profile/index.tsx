import React from 'react';
import { ProgressBar, ProfileChange, ProfileSettings, ProfileAvatar } from '../../components';
import { NookInterface } from '../../components/profile/NookInterface';
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
