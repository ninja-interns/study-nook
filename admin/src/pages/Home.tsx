import { Box, Typography } from "@material-ui/core"

const Home = () => {
	return (
		<Box sx={{ height: "100vh", width: "100vw", bgcolor: "#fff1ec" }}>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<Typography color="primary" variant="h1">
					Welcome to Studynook!
				</Typography>
			</Box>
		</Box>
	)
}

export { Home }
