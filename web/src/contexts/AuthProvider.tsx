import React, { ReactNode, useState } from "react";
import { useContext } from "react";

export const AuthContext = React.createContext({} as AuthContextI);

interface AuthProviderI {
	children: ReactNode;
}

interface AuthContextI {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthProvider({ children }: AuthProviderI) {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(document.cookie.includes("session"));

	const value = {
		isLoggedIn,
		setIsLoggedIn,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
