import { useState } from "react";
import { createContainer } from "unstated-next";

//can call any of these exports outside of the React Functional Component directly from this file
export interface IAuthCurrentUser {
	name: string | null;
	username: string | null;
	email: string | null;
}

function AuthDataContainer() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(document.cookie.includes("session"));
	const [currentUser, setCurrentUser] = useState<IAuthCurrentUser>({
		name: null,
		username: null,
		email: null,
	});

	return {
		isLoggedIn,
		setIsLoggedIn,
		currentUser,
		setCurrentUser,
	};
}

export const AuthContainer = createContainer(AuthDataContainer);
