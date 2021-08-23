import React, { ReactNode, useState } from "react";
import { useContext } from "react";

export const AuthContext = React.createContext({} as AuthContextI);

interface AuthProviderI {
	children: ReactNode;
}

export interface CurrentUserI {
	name: string | null;
	username: string | null;
	email: string | null;
}

interface AuthContextI {
	currentUser: CurrentUserI;
	setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserI>>;
}

export default function AuthProvider({ children }: AuthProviderI) {
	const [currentUser, setCurrentUser] = useState<CurrentUserI>({
		name: null,
		username: null,
		email: null,
	});

	const value = {
		currentUser,
		setCurrentUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
