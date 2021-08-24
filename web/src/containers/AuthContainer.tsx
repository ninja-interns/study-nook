import { useState } from "react";
import { createContainer } from "unstated-next";

//can call any of these exports outside of the React Functional Component directly from this file
export interface AuthCurrentUserI {
	name: string | null;
	username: string | null;
	email: string | null;
}

function AuthDataContainer() {
	const isLoggedIn = document.cookie.includes("session");
	const [currentUser, setCurrentUser] = useState<AuthCurrentUserI>({
		name: null,
		username: null,
		email: null,
	});

	return {
		isLoggedIn,
		currentUser,
		setCurrentUser,
	};
}

export const useAuthContainer = createContainer(AuthDataContainer);
