import { useEffect } from "react";
import { useAuth, AuthCurrentUserI } from "../contexts/AuthProvider";

//this is a custom hook designed to be called at the beginning of each page to allow current User state and info to be persisted across refreshes.
export function useGetState() {
	const { setCurrentUser } = useAuth();

	// this useEffect will run on every reload of the page component only
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("/api/state", {
					method: "GET",
					headers: { "content-type": "application/json" },
				});
				const data: AuthCurrentUserI = await response.json();
				console.log(data);
				setCurrentUser(data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [setCurrentUser]);
}
