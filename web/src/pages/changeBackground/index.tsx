import { Box, Container, Typography } from "@mui/material"
import { useState } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import closeButton from "../../assets/close-button.png"
import { Background } from "../../components/background"

export function ChangeBackgroundPage() {
	const history = useHistory()
	const [redirect, setRedirect] = useState<string | null>(null)

	return (
		<>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Container
				sx={{
					width: "400px",
					height: "600px",
					position: "absolute",
					border: "solid black",
					overflowY: "scroll",
					"&::-webkit-scrollbar": {
						display: "none",
					},
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "center",
				}}
			>
				<Container
					sx={{
						marginBottom: "70px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography
						sx={{
							position: "absolute",
							left: "0px",
							top: "0px",
							margin: "20px",
							fontSize: "25px",
						}}
					>
						Change Focus Zone
					</Typography>
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
				</Container>
				<Container>
					<Background background={"zone1"} />

					<Background background={"zone2"} />

					<Background background={"zone3"} />

					<Background background={"zone4"} />

					<Background background={"zone5"} />

					<Background background={"zone6"} />

					<Background background={"zone7"} />

					<Background background={"zone8"} />

					<Background background={"zone9"} />
				</Container>

				<Container
					sx={{
						marginTop: "40px",
					}}
				></Container>
			</Container>
		</>
	)
}
