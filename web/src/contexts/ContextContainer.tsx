import { useState } from "react";
import { createContainer } from "unstated-next";

//can call any of these exports outside of the React Functional Component directly from this file
export interface IAuthCurrentUser {
	name: string | null;
	username: string | null;
	email: string | null;
}

function ContextDataContainer() {
	//Auth
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
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

export const ContextContainer = createContainer(ContextDataContainer);
