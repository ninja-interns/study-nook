import React from 'react';
import { ProgressBar, ProfileChange } from '../../components';
import { useStyles } from './profileStyle';


export function ProfilePage() {
    const cssStyle = useStyles();
    return (
        <div className={cssStyle.container}>
            <ProfileChange />
        </div>
    );
}