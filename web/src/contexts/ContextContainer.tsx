import { Details } from "@mui/icons-material"
import { useState } from "react"
import { createContainer } from "unstated-next"

import images from "../assets/Avatars"
import backgrounds from "../assets/Backgrounds"

//can call any of these exports outside of the React Functional Component directly from this file
export interface IAuthCurrentUser {
	name: string | null
	username: string | null
	email: string | null
	coins: string | null
	level: string | null
	experience: number | undefined
	currentBackground: keyof typeof backgrounds
	currentAvatar: keyof typeof images
}

function ContextDataContainer() {
	//Auth
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
		chrome.cookies.get({ url: "http://localhost:3000", name: "session" }, function (cookie) {
			if (cookie) {
				setIsLoggedIn(true)
				return
			}
			setIsLoggedIn(false)
			return
		}) !== null,
	)
	const [currentUser, setCurrentUser] = useState<IAuthCurrentUser>({
		name: null,
		username: null,
		email: null,
		coins: null,
		level: null,
		experience: undefined,
		currentBackground: "undefined",
		currentAvatar: "undefined",
	})

	return {
		isLoggedIn,
		setIsLoggedIn,
		currentUser,
		setCurrentUser,
	}
}

export const ContextContainer = createContainer(ContextDataContainer)
