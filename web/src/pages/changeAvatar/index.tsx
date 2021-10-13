import { Box, Container, Typography } from "@mui/material"
import { useState } from "react"
import { Redirect, Route, useHistory } from "react-router-dom"
import closeButton from "../../assets/close-button.png"
import { Avatar } from "../../components/avatar"

export function ChangeAvatarPage() {
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
						Change Avatar
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
				<Container
					sx={{
						margin: "50px",
						marginTop: "30px",
						display: "grid",
						gridTemplateColumns: "auto auto",
						gridColumnGap: "110px",
						gridRowGap: "40px",
					}}
				>
					<Avatar avatar={"avatar1"} />

					<Avatar avatar={"avatar2"} />

					<Avatar avatar={"avatar3"} />

					<Avatar avatar={"avatar4"} />

					<Avatar avatar={"avatar5"} />

					<Avatar avatar={"avatar6"} />

					<Avatar avatar={"avatar7"} />

					<Avatar avatar={"avatar8"} />

					<Avatar avatar={"avatar9"} />

					<Avatar avatar={"avatar10"} />

					<Avatar avatar={"avatar11"} />

					<Avatar avatar={"avatar12"} />

					<Avatar avatar={"avatar13"} />
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
