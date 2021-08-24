import { useEffect } from "react";
import { useAuth, CurrentUserI } from "../contexts/AuthProvider";

export function useGetState() {
	const { setCurrentUser } = useAuth();

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("/api/state", {
					method: "GET",
					headers: { "content-type": "application/json" },
				});
				const data: CurrentUserI = await response.json();
				console.log(data);
				setCurrentUser(data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [setCurrentUser]);
}
