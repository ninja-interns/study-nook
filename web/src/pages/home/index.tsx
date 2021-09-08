import React from "react";
import { Home } from "../../components";
import { Fade } from "@material-ui/core";

export function HomePage() {
	return (
		<Fade in={true} timeout={1000}>
			<div>
				<Home />
			</div>
		</Fade>
	);
}
