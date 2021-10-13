import { Button, Container, Typography } from "@mui/material"
import { useState } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import { Coins, GameInterface, Level } from "../../components"
import NavigationBar from "../../components/bottomNavigationBar"
import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"

export function Dashboard() {
	useGetState()
	const { currentUser } = ContextContainer.useContainer()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<div>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />

			<>
				<GameInterface />
				<Level />
				<Coins />

				<Typography
					sx={{
						position: "absolute",
						margin: "25px",
						top: "0px",
						right: "0px",
						fontFamily: "arial",
						fontSize: "17px",
						textTransform: "uppercase",
					}}
				>
					{currentUser.username}
				</Typography>

				<Button
					variant="contained"
					color="primary"
					onClick={() => history.push("/changeAvatar")}
					sx={{
						position: "absolute",
						left: "0px",
						top: "214px",
						margin: "20px",
						fontSize: "12px",
					}}
				>
					Change Avatar
				</Button>

				<Button
					variant="contained"
					color="primary"
					onClick={() => history.push("/changeBackground")}
					sx={{
						position: "absolute",
						right: "0px",
						top: "214px",
						margin: "20px",
						fontSize: "12px",
					}}
				>
					Change Background
				</Button>

				<Button
					variant="contained"
					color="primary"
					onClick={() => history.push("/nookingSetup")}
					sx={{
						position: "absolute",
						margin: "20px",
						top: "0px",
						left: "0px",
						fontSize: "13px",
					}}
				>
					Start Nooking
				</Button>
				<NavigationBar />
			</>
		</div>
	)
}
