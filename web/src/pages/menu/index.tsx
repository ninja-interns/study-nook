import { Box, Container, Fade, Typography } from "@mui/material"
import { BoxProps } from "@mui/material/Box"
import { useState } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import closeButton from "../../assets/close-button.png"
import { Logout } from "../../components"
import NavigationBar from "../../components/bottomNavigationBar"

function Item(props: BoxProps) {
	const { sx, ...other } = props
	return (
		<Box
			sx={{
				bgcolor: "primary.main",
				color: "white",
				p: 1,
				m: 1,
				borderRadius: 1,
				textAlign: "center",
				fontSize: 19,
				fontWeight: "700",
				...sx,
			}}
			{...other}
		/>
	)
}

export function MenuPage() {
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Fade in={true} timeout={1000}>
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
					<Box sx={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)" }}>
						<Item>Settings</Item>
						<Item onClick={() => history.push("./achievements")}>Achievements</Item>
						<Item onClick={() => history.push("./support")}>Support</Item>
						<Item>
							<Logout />
						</Item>
					</Box>
					<NavigationBar />
				</Container>
			</Fade>
		</>
	)
}
