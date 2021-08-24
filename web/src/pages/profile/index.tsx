import React from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useGetState } from "../../utils/getState";

export function Profile() {
	useGetState();
	const { currentUser } = useAuth();
	return (
		<div>
			Profile
			<h2>{currentUser.name}</h2>
		</div>
	);
}
