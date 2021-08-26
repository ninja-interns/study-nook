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
