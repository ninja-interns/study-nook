import { useEffect } from "react"
import { IAuthCurrentUser, ContextContainer } from "../contexts/ContextContainer"
import { DomainContainer } from "../contexts/DomainContext"

//this is a custom hook designed to be called at the beginning of each page to allow current User state and info to be persisted across refreshes.
export function useGetState() {
	const { setCurrentUser, setIsLoggedIn } = ContextContainer.useContainer()
	const { url } = DomainContainer.useContainer()

	// this useEffect will run on every reload of the page component only
	useEffect(() => {
		let isMounted = true
		;(async () => {
			try {
				const response = await fetch(`${url}/api/state`, {
					method: "GET",
					headers: { "content-type": "application/json" },
				})
				const data: IAuthCurrentUser = await response.json()
				if (isMounted) {
					setIsLoggedIn(data.name !== null)
					setCurrentUser(data)
				}
			} catch (err) {
				console.error(err)
			}
		})()

		return () => {
			isMounted = false
		}
	}, [setCurrentUser, setIsLoggedIn])
}
