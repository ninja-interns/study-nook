import React from "react";
import { useAuthContainer } from "../../containers/AuthContainer";
import { useGetState } from "../../utils/getState";

export function Profile() {
	useGetState();
	const { currentUser } = useAuthContainer.useContainer();
	return (
		<div>
			Profile
			<h2>{currentUser.name}</h2>
		</div>
	);
}
