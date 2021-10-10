import { Button } from "@mui/material"
import { useHistory } from "react-router-dom"
import { Logout } from "../../components"
import AppBarComponent from "../../components/appBar"

/**
 * * MENU PAGE
 * * Links to the following Components / Pages:
 * * Profile (Update avatar, display picture, theme), Achievements, Session History, Support, Settings (updates user info and delete account)
 */
export function Menu() {
	const history = useHistory()

	return (
		<>
			<AppBarComponent />
			<Button onClick={() => history.push("/profile")}>Profile</Button>
			{/* <Button onClick={() => history.push("/updateUser")}>Update User</Button>
			<Button onClick={() => history.push("/updatePassword")}>Update Password</Button> */}
			<Button onClick={() => history.push("./achievements")}>Achievements</Button>
			<Button>Sessions History</Button>
			<Button onClick={() => history.push("./support")}>Support</Button>
			<Button>Settings</Button>
			{/* <DeleteAccount /> */}
			<Button>
				<Logout />
			</Button>
		</>
	)
}
