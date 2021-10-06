import { useState } from "react"
import { createContainer } from "unstated-next"

//can call any of these exports outside of the React Functional Component directly from this file
export interface IAuthCurrentUser {
	name: string | null
	username: string | null
	email: string | null
	coins: string | null
	level: string | null
	experience: number | undefined
}

function ContextDataContainer() {
	//Auth
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(document.cookie.includes("session"))
	const [currentUser, setCurrentUser] = useState<IAuthCurrentUser>({
		name: null,
		username: null,
		email: null,
		coins: null,
		level: null,
		experience: undefined,
	})

	return {
		isLoggedIn,
		setIsLoggedIn,
		currentUser,
		setCurrentUser,
	}
}

export const ContextContainer = createContainer(ContextDataContainer)
