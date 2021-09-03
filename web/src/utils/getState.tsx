import { useEffect } from "react";
import { IAuthCurrentUser, ContextContainer } from "../contexts/ContextContainer";

//this is a custom hook designed to be called at the beginning of each page to allow current User state and info to be persisted across refreshes.
export function useGetState() {
	const { setCurrentUser, setIsLoggedIn } = ContextContainer.useContainer();

	// this useEffect will run on every reload of the page component only
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("/api/state", {
					method: "GET",
					headers: { "content-type": "application/json" },
				});
				const data: IAuthCurrentUser = await response.json();
				console.log(data);
				setIsLoggedIn(data.name !== null);
				setCurrentUser(data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [setCurrentUser, setIsLoggedIn]);
}
