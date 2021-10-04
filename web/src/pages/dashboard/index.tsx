import { Button, Fade, Typography } from "@material-ui/core";
import { useHistory, Route, Redirect } from "react-router-dom";
import { useState } from "react";

import { ContextContainer } from "../../contexts/ContextContainer";
import { useGetState } from "./../../utils/getState";
import { GameInterface } from "../../components/gameInterface";
import { useStyles } from "./dashboardCss";

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

					<Button className={css.menuButton} variant="contained" color="primary" onClick={() => history.push("/menu")}>Menu</Button>
				</div>
			</Fade>
		</div>

	);
}
