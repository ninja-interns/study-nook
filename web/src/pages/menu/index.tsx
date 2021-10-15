import { Box, Button, Container, Stack } from "@mui/material"
import { useState } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import closeButton from "../../assets/close-button.png"
import { Logout } from "../../components"
import NavigationBar from "../../components/bottomNavigationBar"

export function MenuPage() {
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Container
				sx={{
					position: "absolute",
					width: "400px",
					height: "600px",
				}}
			>
				<Box
					component="img"
					src={closeButton}
					alt="Close button"
					onClick={() => history.goBack()}
					sx={{
						width: "40px",
						position: "absolute",
						top: "0px",
						right: "0px",
						margin: "20px",
						cursor: "pointer",
					}}
				></Box>
				<Stack
					direction="column"
					justifyContent="center"
					alignItems="flex-start"
					spacing={2}
					sx={{
						mt: 10,
					}}
				>
					<Button>Settings</Button>
					<Button onClick={() => history.push("./achievements")}>Achievements</Button>
					<Button onClick={() => history.push("./support")}>Support</Button>
					<Logout />
				</Stack>
				<NavigationBar />
			</Container>
		</>
	)
}
