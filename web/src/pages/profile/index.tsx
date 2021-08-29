<<<<<<< HEAD
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
=======
import React from "react";
import { AuthContainer } from "../../containers/AuthContainer";
import { useGetState } from "../../utils/getState";

export function Profile() {
	useGetState();
	const { currentUser } = AuthContainer.useContainer();
	return (
		<div>
			Profile
			<h2>{currentUser.name}</h2>
		</div>
	);
}
>>>>>>> e16be99060d970b3d3f909b223482a19b6250048
