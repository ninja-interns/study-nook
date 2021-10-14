import { Avatar, Box, Button, Container, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import { Coins, GameInterface, Level } from "../../components"
import NavigationBar from "../../components/bottomNavigationBar"
import { ContextContainer } from "../../contexts/ContextContainer"
import { useGetState } from "./../../utils/getState"
import PersonIcon from "@mui/icons-material/Person"

export function Dashboard() {
	useGetState()
	const { currentUser } = ContextContainer.useContainer()
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<div>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />

			<>
				<Box sx={{ position: "absolute", bottom: "100px", margin: "25px" }}>
					<GameInterface />
				</Box>
				<Level />
				<Coins />

				<Stack direction="row" spacing={2} alignItems="center" sx={{ position: "absolute", margin: "25px", top: "0px", right: "0px" }}>
					<Typography
						sx={{
							fontFamily: "arial",
							fontSize: "17px",
							textTransform: "uppercase",
						}}
					>
						{currentUser.username}
					</Typography>
					<Avatar>
						<PersonIcon />
					</Avatar>
				</Stack>

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
				<NavigationBar />
			</>
		</div>
	)
}
