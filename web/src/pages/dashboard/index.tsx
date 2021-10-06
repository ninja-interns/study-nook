import { Button, Fade, Typography, LinearProgress, styled } from "@material-ui/core";
import { linearProgressClasses } from "@mui/material";
import { useHistory, Route, Redirect } from "react-router-dom";
import { useState } from "react";

import { ContextContainer } from "../../contexts/ContextContainer";
import { useGetState } from "./../../utils/getState";
import { GameInterface } from "../../components/gameInterface";
import { useStyles } from "./dashboardCss";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	width: 150,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.type === 'light' ? '#1a90ff' : '#308fe8',
	},
}));

export function Dashboard() {
	useGetState();
	const css = useStyles();
	const { currentUser } = ContextContainer.useContainer();
	const history = useHistory();
	const [redirect, setRedirect] = useState<string | null>(null);

	return (

		<div>
			<Route render={() => (redirect !== null ? <Redirect push to={redirect} /> : null)} />
			<Fade in={true} timeout={1000}>
				<div className={css.container}>

					<GameInterface />

					<Typography className={css.username}>{currentUser.username}</Typography>

					<div className={css.levelBar}>
						<BorderLinearProgress variant="determinate" value={20} />
						<p className={css.levelNumber}>Level: </p>

					</div>

					<Button className={css.startNookingButton} variant="contained" color="primary" onClick={() => history.push("/menu")}>Start Nooking</Button>
					<Button className={css.menuButton} variant="contained" color="primary" onClick={() => history.push("/menu")}>Menu</Button>
				</div>
			</Fade>
		</div>

	);
}
