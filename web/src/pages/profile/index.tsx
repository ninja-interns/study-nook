import React from 'react';
import { ProgressBar, ProfileChange, ProfileSettings } from '../../components';
import { useStyles } from './profileStyle';


export function ProfilePage() {
    const cssStyle = useStyles();
    return (
        <div className={cssStyle.container}>
            <ProfileSettings />
        </div>
    );
}